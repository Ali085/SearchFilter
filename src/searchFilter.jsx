import React, { useEffect, useState } from 'react'
import './Filter.scss'

export default function SearchFilter() {
    const [data, setData] = useState([]);
    const [SearchData, setSearchData] = useState([]);
    const [InpValue, setInpValues] = useState('');
    const [Btn, setBtn] = useState(true)
    useEffect(() => {
        const fetchDatas = () => {
            fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then(json => {
                    setData(json)
                    setSearchData(json)
                });
        }
        fetchDatas();
    }, [])
    const handleFilter = (e) => {
        if (e.target.value == '') {
            setData(SearchData)
        } else {
            const filterResult = SearchData.filter(element => element.title.toLowerCase().includes(e.target.value.toLowerCase()))
            setData(filterResult)
        }
        setInpValues(e.target.value)
    }
    return (
        <> 
            <div>
                <div class="Hotbg">
                    <input value={InpValue} type="text" class="Hotbg-txt" placeholder="Search >>>" onInput={(e) => handleFilter(e)} />
                    <a href="#" class="Hotbg-btn">
                        <button className='BTN' onClick={() => { setData([...data].sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price)) ? -1 : 0)) }}>Sorting</button>
                    </a>
                </div>
            </div>
            <div className='AllProduct'>
                {
                    data.map(element => {
                        return (
                            <div class="container page-wrapper">
                                <div class="page-inner">
                                    <div class="row">
                                        <div class="el-wrapper">
                                            <div class="box-up">
                                                <div class="img-info">
                                                    <div class="info-inner">
                                                        <span class="p-name">{element.title}</span>
                                                        <span class="p-company">{element.description}</span>
                                                    </div>
                                                    <div class="a-size">Catagory : <span class="size">{element.category}</span></div>
                                                </div>
                                            </div>

                                            <div class="box-down">
                                                <div class="h-bg">
                                                    <div class="h-bg-inner"></div>
                                                </div>

                                                <a class="cart" href="#">
                                                    <span class="price">{element.price}</span>
                                                    <span class="add-to-cart">
                                                        <span class="txt">Add in cart</span>
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>

    )
}
