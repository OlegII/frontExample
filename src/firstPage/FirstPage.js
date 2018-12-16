import React from "react";
import menu from "../firstPage/menu.svg";
import "../firstPage/button menu.css";

export class MenuHideShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    return (
      <div className="h1-border">
        <button className="button-menu" onClick={this.onButtonClick}>
          <img src={menu} className="menu-logo" alt=""/>
        </button>
        {this.state.showMenu ? this.props.children : null}
      </div>
    );
  }
}
