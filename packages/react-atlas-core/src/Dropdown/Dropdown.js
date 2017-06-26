import React from "react";
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ButtonCore } from "../index";

const buttonClasses = cx({
  'ra_styles__rounded': true,
  'ra_dropdown__dropdown-button': true,
  'ra_button__button ra_button__default_btn': true,
  'ra_button__base': true,
  'ra_styles__marg-0': true,
  'ra_styles__bold': true,
  'ra_styles__button-pad-1': true,
  'ra_styles__border': true,
  'ra_styles__cursor-pointer': true,
  'ra_styles__charcoal': true,
  'ra_styles__border-med-grey': true,
});

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "active": false,
      "output": "Select One",
      "hiddenValue": "",
      "buttonWidth": this.props.buttonWidth ? this.props.buttonWidth : 150,
      "optionWidth": 150,
      "onChange": "",
      "customLabel": this.props.customLabel ? this.props.customLabel : "Select One",
      "customDefaultText": this.props.customDefaultText ? this.props.customDefaultText : ""
    };
  }

  componentDidMount() {
    window.addEventListener("click", this._onWindowClick);
    window.addEventListener("blur", this._onWindowBlur);
    //setTimeout(this._measureHeader.bind(this));

  }

  componentWillUnmount() {
    window.removeEventListener("click", this._onWindowClick);
    window.addEventListener("blur", this._onWindowBlur);
  }

  _onWindowClick = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if(this.state.active === true) {
        this.setState({'active': false});
      }
    }
  };

  _onWindowBlur = event => {

  };

  _toggle = event => {
    let buttonWidth = this.wrapperRef ? this.wrapperRef : "";
    console.log("this: ", this.buttonNode)
    this.setState({'active': !this.state.active,
                   'optionWidth': 'asdasd' });

  };

  _clickHandler = (i, event) => {
    const selected = event.target.innerText;
    this.setState({'output': selected, 
                   'active': !this.state.active,
                   'index': i,
                   'hiddenValue': selected});
    this.state.onChange(selected);
  };

  _measureHeader() {
    const width = this.refs.buttonNode(this.logWelcomeLayout);

    console.log(width)
    //this.wrapperRef.measure((ox, width) => {
    //  this.setState({optionWidth: width});
    //});
    //console.log(this.state.optionWidth)
  };

  render() {
    const { children, className, ...props } = this.props;
    const active = this.state.active;
   const classes = cx(
    {
      "content": true,
      "active": active,
      "container": true
    });

    const bound_children = children.map((child, i) => {
      let childrenLength = children.length;
      let kid = "";
      switch (true) {
        case i === 0 && i === (childrenLength -1) && i != this.state.index:
          kid = <li key={i} styleName={"item firstChild lastChild"} style={listStyles} onClick={this._clickHandler.bind(this, i)}>{child}</li>;
          break;
        case i === 0 && i !== (childrenLength -1) && i != this.state.index:
          kid = <li key={i} styleName={"item firstChild"} style={listStyles} onClick={this._clickHandler.bind(this, i)}>{child}</li>;
          break;
        case i === 0 && i === (childrenLength -1) && i === this.state.index:
          kid = <li key={i} styleName={"selected firstChild lastChild"} style={listStyles} onClick={this._clickHandler.bind(this, i)}>{child}</li>;
          break;
        case i === 0 && i !== (childrenLength - 1) && i === this.state.index:
          kid = <li key={i} styleName={"selected firstChild"} style={listStyles} onClick={this._clickHandler.bind(this, i)}>{child}</li>;
          break;
        case i !== 0 && i === (childrenLength -1) && i != this.state.index:
          kid = <li key={i} styleName={"item lastChild"} style={listStyles} onClick={this._clickHandler.bind(this, i)}>{child}</li>;
          break;
        case i !== 0 && i !== (childrenLength -1) && i != this.state.index:
          kid = <li key={i} styleName={"item"} style={listStyles} onClick={this._clickHandler.bind(this, i)}>{child}</li>;
          break;
        case i !== 0 && i === (childrenLength -1) && i === this.state.index:
          kid = <li key={i} styleName={"selected lastChild"} style={listStyles} onClick={this._clickHandler.bind(this, i)}>{child}</li>;
          break;
        case i !== 0 && i !== (childrenLength -1) && i === this.state.index:
          kid = <li key={i} styleName={"selected"} style={listStyles} onClick={this._clickHandler.bind(this, i)}>{child}</li>;
          break;
      }
      return kid;
    });

    return (
      <div {...props} ref={(node) => (this.wrapperRef = node)} className={className} styleName={classes} onClick={this._toggle}>
        {this.state.customLabel ? <label>{this.state.customLabel}</label> : null}
        <div styleName={}>
          <ButtonCore className={buttonClasses} onClick={this.props.clickEvent} onChange={this.props.changeEvent} ref={(buttonNode) => (this.buttonNode = buttonNode)} style={{width: this.state.buttonWidth}}><span>{this.state.output}</span><i styleName="arrow"></i></ButtonCore>
          {this.state.active ? <span styleName={"list"}>{bound_children}</span> : null}
          <input type="hidden" value={this.state.hiddenValue}/>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  /* Boolean value taht tells the dropdown wether to
    be open or not.*/
  "active": PropTypes.bool,

  /* A callback funtion that is called when a new menu item is selected. */
  "onChange": PropTypes.func,

  /* . */
  "clickEvent": PropTypes.func,

  /* . */
  "changeEvent": PropTypes.func,

  /* The children elements to be wrapped by the dropdown menu. */
  "children": PropTypes.node,

  /* Pass CSS styles to className to set them on the dropdown component. */
  "className": PropTypes.string
};

Dropdown.defaultProps = {
  "customDefaultText": "",
  "customLabel": "",
  "customWidth": "",
  "clickEvent": "",
  "changeEvent": "",
  "disabled": false

}

export default Dropdown;
