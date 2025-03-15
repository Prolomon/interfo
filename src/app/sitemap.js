

export default async function sitemap() {

    // const product = products.map((_p) => ({
    //     url: `${process.env.WATAWARA_BASE_URL}/category/${_p?.category.toLowerCase().replace(/\s+/g, "-").replace("&", "and")}/product/${_p?.title.toLowerCase().replace(/\s+/g, "-").replace("&", "and")}?p=${_p?.id}`,
    //     changeFrequency: "weekly",
    //     lastModified: new Date(),
    // }))

    return [
        {
            url: `${process.env.WATAWARA_BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: "yearly"
        }
    ]
}