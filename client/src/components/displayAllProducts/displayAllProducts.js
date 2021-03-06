import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
// import { Link, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

class DisplayAllProducts extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
    this.getProducts();
  }
  state = {
    products: [],
  };
  handleSubmit(e) {
    if (localStorage.token) {
      window.location.href = "/Payment";
    } else {
      window.location.href = "/Register";
      // this.props.history.push("/Login");
    }
  }
  handleClick(id) {
    if (localStorage.token) {
      const token = localStorage.token;
      var decode = jwt_decode(token);
      axios
        .post("/addToCardUser", { productID: id, UserID: decode.UserID })
        .then((result) => {
          console.log("this is in card in ", result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.location.href = "/Register";
      // this.props.history.push("/Login");
    }
  }
  async getProducts() {
    await axios
      .get("/findAllProducts")
      .then((result) => {
        console.log(result);
        const finalData = result.data;

        console.log("=====>>>>////???>>>", finalData);
        this.setState({ products: finalData });
      })
      .catch((err) => {
        console.log("it is an error in DisplayAllProducts compoments", err);
      });
  }
  render() {
    const products = this.state.products ? this.state.products : [];
    return (
      <div>
        <ul>
          {products.map((element, index) => {
            var quality = "very good";
            if (element.quality === 3) {
              quality = "good";
            } else if (element.quality === 1) {
              quality = "Exellent";
            }
            return (
              <row>
                <Card style={{ width: "22rem" }}>
                  <Card.Img variant="top" src={element.images} />
                  <Card.Body style={{color:'#333d82'}}>
                    <Card.Title>{element.title}</Card.Title><br></br>
                    <Card.Text>Price: $ {element.price}</Card.Text>
                    <Card.Text>Quality: {quality}</Card.Text>
                    <Card.Text>Description: {element.description}</Card.Text>
                    <Card.Text>Location: {element.location}</Card.Text>
                    {/* <Link to="/Payment" className="brand-logo"> */}
                    <Button
                      class="ui small pink button"
                      className="btn"
                      style={{
                        marginLeft: "40px",
                        margin: "30px",
                        backgroundColor: "#EC407A",
                      }}
                      variant="primary"
                      value={this.state.products}
                      onClick={() => {
                        this.handleSubmit(element._id);
                      }}
                    >
                      {/* buy */}
                      <i class="payment icon"></i>
                    </Button>
                    {/* </Link> */}

                    <Button
                      class="ui small pink button"
                      style={{ backgroundColor: "#EC407A" }}
                      variant="primary"
                      value={this.state.products}
                      onClick={() => {
                        this.handleClick(element._id);
                      }}
                    >
                      {/* To Cart */}
                      <i class="cart icon"></i>
                    </Button>
                  </Card.Body>
                </Card>
              </row>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default DisplayAllProducts;
