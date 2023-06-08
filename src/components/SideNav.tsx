// @ts-ignore
import * as fcl from '@onflow/fcl'
import classNames from "classnames";
import { useAuthor } from 'hooks/useAuthor';
import useCurrentUser from 'hooks/useCurrentUser';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandLogo } from "../images"

type TabType = "Articles" | "Subscribers" | "Claimed";
const NavData: NavBarGroupData = [
      {
        title: "Articles",
        route: "/dashboard",
        imgSrc: "article",
      },
      {
        title: "Subscribers",
        route: "/subscribers",
        imgSrc: "people",
      },
      {
        title: "Claimed",
        route: "/claimed-posts",
        imgSrc: "copyright",
      },
    ]

function SideNav({ selectedTab }: { selectedTab: TabType }) {
  const user = useCurrentUser()
  const { author } = useAuthor(user?.addr)

  const navigate = useNavigate();
  return (
    <>
      <div className="overflow-y-auto py-4 px-3 bg-white-100 h-full w-[300px] flex flex-col justify-between">
        <div>
            <NavBarLogo />
            <div className="pt-4 pl-4">
                {NavData.map((data) => {
                return (
                    <NavBarGroup
                    key={data.title}
                    selectedTab={selectedTab}
                        {...data}
                    />
                );
                })}
            </div>
        </div>
        <div className="flex pl-4 cursor-pointer" >
            {
              author?.img && 
              <img 
              onClick={() => navigate(`/${user?.addr}`)}
                src={author?.img}
                className="rounded-full h-10"
                alt="Flowbite Logo"
              />
            }
            <div className="flex flex-col ml-2 w-52" onClick={() => navigate(`/${user?.addr}`)}>
                {author?.name && <div className="text-sm font-semibold">{author?.name}</div>}
                <div className="text-xs text-gray-500">
                    {author?.findName ? author?.findName : user?.addr}
                </div>
            </div>
            <span onClick={() => fcl.unauthenticate()} className="material-icons text-base px-2 pt-1 w-8 h-8 hover:bg-gray-100 rounded-full self-center cursor-pointer">logout</span>
        </div>
      </div>
    </>
  );
}

export function NavBarLogo({isHomePage = false}: {isHomePage?: boolean}) {
  return (
    <a href="#" className={classNames("flex items-center pl-2.5 mb-5",
    {
      "mt-4": isHomePage
    }
    )}>
      <img
        src={BrandLogo}
        className={
          classNames("mr-3",
        {
          "h-12 ml-10": isHomePage,
          "h-8": !isHomePage
        }
      )}
        alt="Paperly"
      />
      <span className={
        classNames("self-center text-xl font-black whitespace-nowrap text-white",
          {
            "text-3xl": isHomePage
          }
        )}>
        Paperly
      </span>
    </a>
  );
}

function NavBarGroup({ title, ...props }: NavBarGroupProps) {
  return (
    <>
      <NavbarItem key={title} title={title} {...props} />
    </>
  );
}

function NavbarItem({ imgSrc, route, title, selectedTab }: NavBarItemProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={classNames(
        "flex items-center p-2 my-4 w-full text-base font-normal rounded-lg transition duration-75 group  text-white hover:bg-gray-700",
        {
          "bg-gray-700": title === selectedTab,
        }
      )}
      onClick={() => navigate(route)}
    >
      <i className="material-icons">{imgSrc}</i>
      <span className={classNames("mx-3 text-left whitespace-nowrap", {
            "text-green-900": title === selectedTab,
      })}>{title}</span>
    </button>
  );
}

type NavBarItemData = {
  title: string;
  route: string;
  imgSrc: string;
};

type NavBarItemProps = NavBarItemData & {
  selectedTab: TabType;
};

type NavBarGroupData =  NavBarItemData[]

type NavBarGroupProps = NavBarItemData & {
  selectedTab: TabType;
};

export default SideNav;
