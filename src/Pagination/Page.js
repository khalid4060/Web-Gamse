import React, { useEffect, useState } from 'react'

const Page = () => {

    const [products, setproducts] = useState()
    const [page,setpage]=useState(4)
    const fetchData = async () => {
        const data = await fetch("https://dummyjson.com/products?limit=100");
        const json = await data.json()
        console.log(json)

        setproducts(json.products);
        
    }
    const handleclick = (selectedPage) => {
        if(selectedPage>0 && products.length/10>=selectedPage)
        setpage(selectedPage);
    }
    useEffect(() => {
        fetchData()
    }, [])
    if(typeof products==='undefined') return <>Laoding </>
    return (
      <>
        <div className="products">
          {products.slice(page * 10 - 10, 10 * page).map((item) => {
            return (
              <div className="img_pro">
                <img key={item.id} src={item.thumbnail} alt="" />
                <div>{item.title}</div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <span
            onClick={() => {
              handleclick(page - 1);
            }}
          >
            ⇦
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selected" : ""}
                onClick={() => {
                  handleclick(i + 1);
                }}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => {
              handleclick(page + 1);
            }}
          >
            ⇨
          </span>
        </div>
      </>
    );
}

export default Page