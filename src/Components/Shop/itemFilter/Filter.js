import React, { Component } from "react";
import filterStyle from "./filter.module.css";
import Data from "../../../data";
import ProductShow from "./ProductShow";

class Filter extends Component {
  state = {
    companyList: [],
    priceList: [],
    approvedId: [],
    selectedCompany: [],
    approvedPhone: [],
    selectedPage: 1,
    pageNumber: [],
    minPrice: null,
    maxPrice: null,
    viewType: "list",
    sortMethod: 0,
    itemCount: 6,
  };
  componentDidMount = () => {
    this.companyListCreate();
    this.approvedIdCreate();

    localStorage.setItem("approvedId", []);
    setInterval(this.filterListener, 500);
  };

  companyListCreate = () => {
    let list = [];
    Data.map((Phone) => {
      if (list.includes(Phone.company) === false) {
        list.push(Phone.company);
      }
    });

    this.setState({ companyList: list });
  };

  findByPrice = () => {
    let id = [];

    Data.map((Phone) => {
      if (
        this.state.maxPrice > 0 &&
        this.state.minPrice > 0 &&
        this.state.minPrice <= Phone.configurationAndPrice[0][1] &&
        this.state.maxPrice >= Phone.configurationAndPrice[0][1]
      ) {
        return id.push(Phone.id);
      }

      if (
        this.state.minPrice &&
        !this.state.maxPrice &&
        this.state.minPrice <= Phone.configurationAndPrice[0][1]
      ) {
        return id.push(Phone.id);
      }
      if (
        this.state.maxPrice > 0 &&
        this.state.minPrice < 0 &&
        this.state.maxPrice <= Phone.configurationAndPrice[0][1]
      ) {
        return id.push(Phone.id);
      }
      if (
        this.state.minPrice &&
        this.state.maxPrice &&
        this.state.minPrice > this.state.maxPrice
      ) {
        return;
      }
    });
    if (this.state.selectedCompany.length > 0) {
    }
    this.setState({ priceList: id }, () => {
      this.approvedIdCreate();
    });
  };

  approvedIdCreate = () => {
    let newList = [];
    let id = [];

    if (
      this.state.selectedCompany.length > 0 &&
      this.state.priceList.length == 0
    ) {
      this.state.selectedCompany.map((Company) => {
        Data.map((Phone) => {
          if (Phone.company == Company) {
            id.push(Phone.id);
          }
        });
      });

      this.setState({ approvedId: id }, () => {
        this.pageSelect();
      });
      return;
    }
    if (
      this.state.selectedCompany.length == 0 &&
      this.state.priceList.length > 0
    ) {
      this.state.priceList.map((price) => {
        Data.map((Phone) => {
          if (Phone.id == price) {
            id.push(Phone.id);
          }
        });
      });

      this.setState({ approvedId: id }, () => {
        this.pageSelect();
      });
      return;
    }
    if (
      this.state.selectedCompany.length > 0 &&
      this.state.priceList.length > 0
    ) {
      Data.map((Phone) => {
        this.state.selectedCompany.map((Company) => {
          if (Company == Phone.company) {
            this.state.priceList.map((Price) => {
              if (Phone.id == Price) {
                newList.push(Phone.id);
                this.setState({ approvedId: id }, () => {
                  this.pageSelect();
                });
                return;
              }
            });
          }
        });
      });
      this.setState({ approvedId: newList }, () => {
        this.pageSelect();
      });
      return;
    }
    Data.map((Phone) => {
      id.push(Phone.id);
    });
    this.setState({ approvedId: id }, () => {
      this.pageSelect();
    });
  };

  pageNumber = () => {
    let page = [];
    for (
      let i = 0;
      i <
      Math.ceil(this.state.approvedId.length / Number(this.state.itemCount));
      i++
    ) {
      page.push(i);
    }
    this.setState({ pageNumber: page }, () => {});
    return;
  };

  pageSelect = () => {
    let itemList = this.state.approvedId;
    let newList = [];

    let size = Number(this.state.itemCount);
    let subarray = [];
    for (let i = 0; i < Math.ceil(itemList.length / size); i++) {
      subarray[i] = itemList.slice(i * size, i * size + size);
    }
    this.setState({ approvedPhone: subarray }, () => {
      console.log(subarray);
      this.propSend();
      this.pageNumber();
    });
  };

  propSend = () => {
    let tmp = localStorage.getItem("approvedId");

    console.log(this.state.approvedId, tmp !== this.state.approvedId);
    console.log(this.state.approvedPhone, this.state.selectedPage);

    if (tmp !== this.state.approvedId) {
      if (this.state.approvedPhone.length == 1) {
        let id = JSON.stringify(this.state.approvedPhone[0]);

        localStorage.setItem("approvedId", id);
        return;
      }
      let id = JSON.stringify(
        this.state.approvedPhone[this.state.selectedPage - 1]
      );
      localStorage.setItem("approvedId", id);
      return;
    }
    localStorage.setItem("approvedId", []);
  };

  handleCompanySelect = (company) => {
    let tmp = this.state.selectedCompany;

    if (company.target.checked == true) {
      tmp.push(company.target.value);
      this.setState({ selectedCompany: tmp }, () => {
        this.approvedIdCreate();
      });
      return;
    }
    let companyArray = [];
    companyArray = this.state.selectedCompany;
    let unCheckedCompanyId = companyArray.indexOf(company.target.value);
    companyArray.splice(unCheckedCompanyId, 1);
    this.setState({ selectedCompany: companyArray, selectedPage: 1 }, () => {
      this.approvedIdCreate();
    });
  };

  handlePriceChange = (event) => {
    if (event.target.name == "min") {
      this.setState({ minPrice: event.target.value }, () => {
        this.findByPrice();
      });
    }
    if (event.target.name == "max") {
      this.setState({ maxPrice: event.target.value }, () => {
        this.findByPrice();
      });
    }
  };
  changePage = (page) => {
    this.setState({ selectedPage: page }, () => {
      this.propSend();
    });
  };

  viewTypeChange = (type) => {
    if (type == "string") {
      this.setState({ viewType: "string" });
      return;
    }
    this.setState({ viewType: "list" });
  };

  itemSort = () => {
    let newApprovedId = this.state.approvedId;

    if (this.state.sortMethod == "PriceUp") {
      for (let i = 0; i < newApprovedId.length; i++) {
        newApprovedId[i] = newApprovedId[i] - 1;
      }
      console.log(newApprovedId, "------");
      newApprovedId.sort((a, b) => {
        console.log(a, b);
        if (
          Number(Data[Number(a)].configurationAndPrice[0][1]) -
            Number(Data[Number(b)].configurationAndPrice[0][1]) <
          0
        ) {
          console.log(
            Number(Data[Number(a)].configurationAndPrice[0][1]) -
              Number(Data[Number(b)].configurationAndPrice[0][1])
          );
          return 1;
        }
        if (
          Number(Data[Number(a)].configurationAndPrice[0][1]) -
            Number(Data[Number(b)].configurationAndPrice[0][1]) >
          0
        ) {
          console.log(
            Number(Data[Number(a)].configurationAndPrice[0][1]) -
              Number(Data[Number(b)].configurationAndPrice[0][1])
          );
          return -1;
        }
        if (
          Number(Data[Number(a)].configurationAndPrice[0][1]) -
            Number(Data[Number(b)].configurationAndPrice[0][1]) ==
          0
        ) {
          return 0;
        }
      });

      for (let i = 0; i < newApprovedId.length; i++) {
        newApprovedId[i] = newApprovedId[i] + 1;
      }
      console.log(newApprovedId);
      this.setState({ approvedId: newApprovedId }, this.pageSelect);
    }
    if (this.state.sortMethod == 0) {
      for (let i = 0; i < newApprovedId.length; i++) {
        newApprovedId[i] = newApprovedId[i] - 1;
      }

      newApprovedId.sort((a, b) => {
        console.log(a, b);
        if (a - b > 0) {
          return 1;
        }
        if (a - b < 0) {
          return -1;
        }
        if (a - b == 0) {
          return 0;
        }
      });

      for (let i = 0; i < newApprovedId.length; i++) {
        newApprovedId[i] = newApprovedId[i] + 1;
      }
      console.log(newApprovedId);
      this.setState({ approvedId: newApprovedId }, this.pageSelect);
    }
    if (this.state.sortMethod == "PriceDown") {
      for (let i = 0; i < newApprovedId.length; i++) {
        newApprovedId[i] = newApprovedId[i] - 1;
      }
      console.log(newApprovedId, "------");
      newApprovedId.sort((a, b) => {
        console.log(a, b);
        if (
          Number(Data[Number(a)].configurationAndPrice[0][1]) -
            Number(Data[Number(b)].configurationAndPrice[0][1]) >
          0
        ) {
          return 1;
        }
        if (
          Number(Data[Number(a)].configurationAndPrice[0][1]) -
            Number(Data[Number(b)].configurationAndPrice[0][1]) <
          0
        ) {
          return -1;
        }
        if (
          Number(Data[Number(a)].configurationAndPrice[0][1]) -
            Number(Data[Number(b)].configurationAndPrice[0][1]) ==
          0
        ) {
          return 0;
        }
      });

      for (let i = 0; i < newApprovedId.length; i++) {
        newApprovedId[i] = newApprovedId[i] + 1;
      }
      console.log(newApprovedId);
      this.setState({ approvedId: newApprovedId }, this.pageSelect);
    }
  };

  itemSortChange = (e) => {
    if (e.target.value == "PriceUp") {
      this.setState({ sortMethod: "PriceUp" }, this.itemSort);
    }
    if (e.target.value == 0) {
      this.setState({ sortMethod: 0 }, this.itemSort);
    }
    if (e.target.value == "PriceDown") {
      this.setState({ sortMethod: "PriceDown" }, this.itemSort);
    }
  };
  itemCountChange = (e) => {
    this.setState({ itemCount: e.target.value }, () => {
      this.pageSelect();
      this.pageNumber();
    });
  };
  render() {
    return (
      <div>
        <div className="section">
          <div className="container">
            <div className="row">
              <div id="aside" className="col-md-3">
                <div className="aside">
                  <h3 className="aside-title">Companies</h3>
                  <div className="checkbox-filter">
                    {this.state.companyList.map((elem, index) => {
                      return (
                        <div className="input-checkbox" key={index}>
                          <input
                            type="checkbox"
                            id={"category-" + index}
                            name={elem}
                            value={elem}
                            onChange={this.handleCompanySelect.bind(this)}
                          ></input>
                          <label htmlFor={"category-" + index}>
                            <span></span>
                            {elem}
                            {/* <small>(740)</small> */}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="aside">
                  <h3 className="aside-title">Price</h3>
                  <div className="price-filter">
                    <div id="price-slider"></div>
                    <div className="input-number price-min">
                      <input
                        onBlur={this.handlePriceChange.bind(this)}
                        placeholder="Min price"
                        name="min"
                        id="price-min"
                        type="number"
                      ></input>
                      {/* <span className="qty-up">+</span>
                      <span className="qty-down">-</span> */}
                    </div>
                    <span>-</span>
                    <div className="input-number price-max">
                      <input
                        onBlur={this.handlePriceChange.bind(this)}
                        name="max"
                        id="price-max"
                        type="number"
                        placeholder="Max price"
                      ></input>
                      {/* <span className="qty-up">+</span>
                      <span className="qty-down">-</span> */}
                    </div>
                  </div>
                </div>
{/* 
                <div className="aside">
                  <h3 className="aside-title">Brand</h3>
                  <div className="checkbox-filter"> */}
                    {/* {this.state.phoneList.map((elem, index) => {
                      return (
                        <div className="input-checkbox">
                          <input type="checkbox" id="brand-1"></input>
                          <label for="brand-1">
                            <span></span>
                            {elem}
                            <small>(578)</small>
                          </label>
                        </div>
                      );
                    })} */}
                  {/* </div>
                </div> */}
              </div>

              <div id="store" className="col-md-9">
                <div className="store-filter clearfix">
                  <div className="store-sort">
                    <label>
                      Sort By:
                      <select
                        onChange={this.itemSortChange.bind(this)}
                        className={filterStyle.sortSelect}
                      >
                        <option value="0">-------</option>
                        <option value="PriceUp">Price up to down</option>
                        <option value="PriceDown">Price down to up</option>
                      </select>
                    </label>

                    <label>
                      Show:
                      <select
                        onChange={this.itemCountChange.bind(this)}
                        className={filterStyle.sortSelect}
                      >
                        <option value="6">6</option>
                        <option value="9">9</option>
                      </select>
                    </label>
                  </div>
                  <ul className="store-grid">
                    <li
                      onClick={this.viewTypeChange.bind(this, "list")}
                      className={
                        this.state.viewType == "list" ? "active" : null
                      }
                    >
                      <i className="fa fa-th"></i>
                    </li>
                    <li
                      onClick={this.viewTypeChange.bind(this, "string")}
                      className={
                        this.state.viewType == "string" ? "active" : null
                      }
                    >
                      <i className="fa fa-th-list"></i>
                    </li>
                  </ul>
                </div>

                <div className={filterStyle.cs}>
                  <ProductShow
                    viewType={this.state.viewType}
                    products={this.state.approvedId}
                  />
                </div>

                <ul className="store-pagination">
                  {this.state.pageNumber.map((page, index) => {
                    return (
                      <li
                        className={
                          this.state.selectedPage == page + 1 ? "active" : null
                        }
                        key={index}
                      >
                        <a onClick={this.changePage.bind(this, page + 1)}>
                          {" "}
                          {page + 1}
                        </a>
                      </li>
                    );
                  })}

                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
