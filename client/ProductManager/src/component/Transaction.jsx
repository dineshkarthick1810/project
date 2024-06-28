import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../App.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import Barchat from './Barchat';
import Statistic from './Statistic';
import ReactPaginate from 'react-paginate';

const Transaction = ({ theme, setTheme }) => {
    // For maintaining the input values
    const [input, setInputvalue] = useState("");

    // For maintaining the total price and sold items and not sold items
    const [totalprice, setTotalPrice] = useState(0);
    const [soldItems, setSoldItems] = useState(0);
    const [notSoldItems, setNotSoldItems] = useState(0);

    // For retrieving data
    const [OriginalDatas, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    
    // For barchart datas
    const [selectedMonthRangeItem, setPriceRangesItems] = useState([]);

    // For maintaining loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const FetchData = async () => {
            const values = await fetch("https://backend-g9w8.onrender.com")
                .then((res) => res.json())
                .then((val) => {
                    setOriginalData(val);
                    setFilteredData(val);
                    setLoading(false);
                });
        };
        FetchData();
    }, []);

    const [pagecount, setCountpage] = useState(1);
    const numberofItems = 5;
    const lastIndex = pagecount * numberofItems;
    const firstIndex = lastIndex - numberofItems;

    useEffect(() => {
        setCurrentItems(filteredData.slice(firstIndex, lastIndex));
    }, [filteredData, pagecount]);

    const pages = Math.ceil(filteredData.length / numberofItems);
    const numbers = [...Array(pages + 1).keys()].slice(1);

    // For handling page click for pagination
    const handlePageClick = (index) => {
        setCountpage(index + 1);
    };

    // For months display in dropdown
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [dropdown, setDropdown] = useState("Select Month");

    const handleDropdown = (e) => {
        const selectedMonth = e.target.innerText;
        setDropdown(selectedMonth);
        handleFilteringDatas(selectedMonth);
    };

    // For filtering the data based on dropdown
    const getMonth = (dateString) => {
        const date = new Date(dateString);
        return months[date.getMonth()];
    };

    const handleFilteringDatas = (selectedMonth) => {
        const filteredData = OriginalDatas.filter((val) => getMonth(val.dateOfSale) === selectedMonth);
        setFilteredData(filteredData);
        updatePriceList(filteredData);
        updateStatistics(filteredData);
    };

    // For filtering the particular data by typing in the input box
    const handleInputValue = (e) => {
        setInputvalue(e.target.value);
        SearchFilter(e.target.value);
    };

    const SearchFilter = (value) => {
        if (value && dropdown !== "Select Month") {
            const filterData = filteredData.filter((res) => {
                return res.title.toLowerCase().includes(value) || res.description.toLowerCase().includes(value) || String(res.price).includes(value);
            });
            setFilteredData(filterData);
        }
    };

    const updatePriceList = (data) => {
        let RangeHundred = 0;
        let RangeTwoHundred = 0;
        let RangeThreeHundred = 0;
        let RangeFourHundred = 0;
        let RangeFiveHundred = 0;
        let RangeSixHundred = 0;
        let RangeSevenHundred = 0;
        let RangeEightHundred = 0;
        let RangeNineHundred = 0;
        let ThosandAbove = 0;
        let above = 0;

        data.forEach((val) => {
            if (val.price <= 100) {
                RangeHundred++;
            } else if (val.price <= 200) {
                RangeTwoHundred++;
            } else if (val.price <= 300) {
                RangeThreeHundred++;
            } else if (val.price <= 400) {
                RangeFourHundred++;
            } else if (val.price <= 500) {
                RangeFiveHundred++;
            } else if (val.price <= 600) {
                RangeSixHundred++;
            } else if (val.price <= 700) {
                RangeSevenHundred++;
            } else if (val.price <= 800) {
                RangeEightHundred++;
            } else if (val.price <= 900) {
                RangeNineHundred++;
            } else if (val.price <= 1000) {
                ThosandAbove++;
            } else {
                above++;
            }
        });

        setPriceRangesItems([RangeHundred, RangeTwoHundred, RangeThreeHundred, RangeFourHundred, RangeFiveHundred, RangeSixHundred, RangeSevenHundred, RangeEightHundred, RangeNineHundred, ThosandAbove, above]);
    };

    const updateStatistics = (data) => {
        const total = data.reduce((total, val) => total + val.price, 0);
        const sold = data.filter((val) => val.sold).length;
        const notSold = data.length - sold;

        setTotalPrice(total);
        setSoldItems(sold);
        setNotSoldItems(notSold);
    };

    return (
        <div className={theme ? 'container-fluid forcontainer bg-dark' : 'container-fluid forcontainer bg-light'}>
            <nav className='navbar navbar-expand-lg shadow ' style={{ background: "#6f42c1", position: "relative" ,flexWrap:"nowrap"}}>
                <a href='' className='navbar-brand forlogo text-white ms-3'>Transaction Dashboard</a>
                <button className="btn dropdown-toggle me-5 mt-2" style={{ color: "white", padding: "10px", outline: "none", border: "none" }} data-bs-toggle="dropdown" aria-expanded="false">
                    <ContrastIcon />
                </button>
                
                <div className='forposition'>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li onClick={() => setTheme(true)}><a className="dropdown-item" style={{ fontWeight: "bold" }} href="#"><span className='me-2'><DarkModeIcon /></span>Dark</a></li>
                        <li className="dropdown-item mt-2" style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => setTheme(!true)}><span className='me-2'><LightModeIcon /></span>Light</li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                <div className='row'>
                    <div className='col' style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100vh" }}>
                        <div className='forinput-dropdown mt-5'>
                            <div className='for-input bg-secondary'>
                                <input type='text' className='bg-secondary' placeholder='Search transaction' onChange={(e) => handleInputValue(e)} />
                            </div>

                            <div className='dropdown-center'>
                                <button className="btn fordropdown-btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ borderRadius: "20px", padding: "15px" }}>
                                    {dropdown}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark" style={{ height: "200px", overflowY: "scroll" }}>
                                    {months.map((val) => {
                                        return <li className="dropdown-item" style={{ fontWeight: "bold" }} onClick={(e) => handleDropdown(e)}>{val}</li>;
                                    })}
                                </ul>
                            </div>
                        </div>

                        {/* For table */}
                        {loading ? (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div className="spinner-border text-primary text-center" role="status" style={{ height: "200px", width: "200px" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className='mt-5 table-scrolling' >
                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr className='table-primary' style={{ height: "60px" }}>
                                            <th>Id</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody className={theme ? "table-light" : "table-dark"}>
                                        {currentItems.map((val) => {
                                            return (
                                                <tr style={{ height: "60px" }}>
                                                    <td>{val.id}</td>
                                                    <td>{val.title}</td>
                                                    <td>{val.description.length > 80 ? val.description.substring(0, 80) + "..." : val.description}</td>
                                                    <td>{val.price}</td>
                                                    <td>{val.category}</td>
                                                    <td><img src={val.image} className='img-fluid' style={{ height: "100px", width: "100px", borderRadius: "50%", backgroundSize: "cover", border: "2px solid blue" }} /></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <nav aria-label="Page navigation example" style={{ display: "flex", justifyContent: "center" }} className='mt-3'>
                                    <ul className="pagination">
                                        {numbers.map((val, index) => {
                                            return <li className="page-item text-white" onClick={() => handlePageClick(index)}><a className="page-link" href="#">{val}</a></li>;
                                        })}
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bar chart */}
                <div className='forbarchart'>
                    <h2 className={theme ? "text-white text-center" : "text-dark text-center"}>Barchart</h2>
                    <Barchat prices={selectedMonthRangeItem} />
                </div>

                {/* Statistics */}
                <div className='forstatistics mt-3'>
                    <h2 className={theme ? "text-white text-center mb-5" : "text-dark text-center mb-5"}>Statistics</h2>
                    <Statistic totalprice={totalprice} soldItems={soldItems} notSoldItems={notSoldItems} />
                </div>
            </div>
        </div>
    );
};

export default Transaction;
