

export const getIpfsURL = (url : string | undefined) => {
    if(!url) return url
    return url.replace("ipfs.io", "nftstorage.link")
}