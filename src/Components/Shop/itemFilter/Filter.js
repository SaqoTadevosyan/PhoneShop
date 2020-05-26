import React, { Component } from "react";
import style from "./filter.module.scss";

import ProductShow from "./ProductShow";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import fire from "../../../backend/config"
class Filter extends Component {
  state = {
    data:[],
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
    let db=[]
    fire
    .database()
    .ref("/data")
    .once("value")
    .then((snapshot) => {
      db = snapshot.val();
    })
    .then(() => {
    this.setState({data:db},()=>{
      this.companyListCreate();
      this.approvedIdCreate();
    })
  })
  

   

    localStorage.setItem("approvedId", []);
    setInterval(this.filterListener, 500);
  };

  companyListCreate = () => {
    let list = [];
   this.state.data.map((Phone) => {
      if (list.includes(Phone.company) === false) {
        list.push(Phone.company);
      }
    });

    this.setState({ companyList: list });
  };

  findByPrice = () => {
    let id = [];

    this.state.data.map((Phone) => {
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
        this.state.maxPrice &&
        !this.state.minPrice &&
        this.state.maxPrice >= Phone.configurationAndPrice[0][1]
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
        this.state.data.map((Phone) => {
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
        this.state.data.map((Phone) => {
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
      this.state.data.map((Phone) => {
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
    this.state.data.map((Phone) => {
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
      tmp.push(company.target.name);
      this.setState({ selectedCompany: tmp }, () => {
        this.approvedIdCreate();
      });
      return;
    }
    let companyArray = [];
    companyArray = this.state.selectedCompany;
    let unCheckedCompanyId = companyArray.indexOf(company.target.name);
    companyArray.splice(unCheckedCompanyId, 1);
    this.setState({ selectedCompany: companyArray, selectedPage: 1 }, () => {
      this.approvedIdCreate();
    });
  };

  handlePriceChange = (event) => {
    console.log(event.target.value);
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
          Number(this.state.data[Number(a)].configurationAndPrice[0][1]) -
            Number(this.state.data[Number(b)].configurationAndPrice[0][1]) <
          0
        ) {
          console.log(
            Number(this.state.data[Number(a)].configurationAndPrice[0][1]) -
              Number(this.state.data[Number(b)].configurationAndPrice[0][1])
          );
          return 1;
        }
        if (
          Number(this.state.data[Number(a)].configurationAndPrice[0][1]) -
            Number(this.state.data[Number(b)].configurationAndPrice[0][1]) >
          0
        ) {
          console.log(
            Number(this.state.data[Number(a)].configurationAndPrice[0][1]) -
              Number(this.state.data[Number(b)].configurationAndPrice[0][1])
          );
          return -1;
        }
        if (
          Number(this.state.data[Number(a)].configurationAndPrice[0][1]) -
            Number(this.state.data[Number(b)].configurationAndPrice[0][1]) ==
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
          Number(this.state.data[Number(a)].configurationAndPrice[0][1]) -
            Number(this.state.data[Number(b)].configurationAndPrice[0][1]) >
          0
        ) {
          return 1;
        }
        if (
          Number(this.state.data[Number(a)].configurationAndPrice[0][1]) -
            Number(this.state.data[Number(b)].configurationAndPrice[0][1]) <
          0
        ) {
          return -1;
        }
        if (
          Number(this.state.data[Number(a)].configurationAndPrice[0][1]) -
            Number(this.state.data[Number(b)].configurationAndPrice[0][1]) ==
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
        
        <div className={style.section}>
          <div className={style.row}>
            <div >
              <div className={style.aside}>
                <h3>Companies</h3>
                <div>
                  {this.state.companyList.map((elem, index) => {
                    return (
                      <div key={index}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              onChange={this.handleCompanySelect.bind(this)}
                              name={elem}
                            />
                          }
                          label={elem}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              
                <h3 className="aside-title">Price</h3>
                <div className={style.priceSlider}>
                  <div className="input-number price-min">
                    <TextField
                      id="price-min"
                      label="Min price"
                      variant="outlined"
                      type="number"
                      size="small"
                      name="min"
                      onBlur={this.handlePriceChange.bind(this)}
                    />
                  </div>
                  <span>-</span>
                  <div className="input-number price-max">
                    <TextField
                      id="price-max"
                      label="Max price"
                      type="number"
                      variant="outlined"
                      size="small"
                      name="max"
                      onBlur={this.handlePriceChange.bind(this)}
                    />
                  </div>
                </div>
              
            </div>

            <div id="store" className="col-md-9">
              <div className={style.storeFilter}>
            
                <div className={style.storeSort}>
                  <div >    <FormControl >
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                    onChange={this.itemSortChange.bind(this)}
                     
                    >
                      <MenuItem value="0">None</MenuItem>
                      <MenuItem value="PriceUp">Price up to down</MenuItem>
                      <MenuItem value="PriceDown">Price down to up</MenuItem>
                    </Select>
                  </FormControl></div>
                 

                
                  <FormControl >
                    <InputLabel id="demo-simple-select-label">Show</InputLabel>
                    <Select
                     onChange={this.itemCountChange.bind(this)}
                     
                    >
                      
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                    </Select>
                  </FormControl>
                  
                </div>
                <ul className={style.sortType}>
                  <li
                    onClick={this.viewTypeChange.bind(this, "list")}
                    className={
                      this.state.viewType == "list" ? style.active : null
                    }
                  >
                    <i className="fa fa-th"></i>
                  </li>
                  <li
                    onClick={this.viewTypeChange.bind(this, "string")}
                    className={
                      this.state.viewType == "string" ? style.active : null
                    }
                  >
                    <i className="fa fa-th-list"></i>
                  </li>
                </ul>
              </div>

              <div >

                <ProductShow
                  viewType={this.state.viewType}
                  products={this.state.approvedId}
                />
              </div>

              <ul className={style.pagination}>
                {this.state.pageNumber.map((page, index) => {
                  return (
                    <li
                      className={
                        this.state.selectedPage == page + 1
                          ? style.active
                          : null
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

               
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
