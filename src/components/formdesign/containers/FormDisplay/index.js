import React, { PureComponent } from "react";
import { Form ,Row,Col} from "antd";
import PropTypes from "prop-types";
import "./index.scss";
import FieldCorAttr from "../../utils/field-cor-attr.js";
const FormItem = Form.Item;

export default class FormDisplay extends PureComponent {
  getFields(item) {
    const { getFieldDecorator } = this.props.form;
    const { attrInfo, type } = item;
    const { name, titleValue, verifyValue } = attrInfo;
    return (
      <FormItem label={titleValue}>
        {getFieldDecorator(name, {
          rules: [
            {
              required: verifyValue,
              message: "必填项!"
            }
          ]
        })(FieldCorAttr[type].getReallyField(attrInfo))}
      </FormItem>
    );
  }
  render() {
    const { fieldsData } = this.props;
    return (
      // <div className="">
      //   {fieldsData.map((items, index) => {
      //     debugger
      //     const grid = items.attrInfo.grid;
      //     const { rowtem, coltem, cells } = grid;
      //     const GridStyle = {
      //       display: "grid",
      //       gridTemplateRows: `${rowtem.join(" ")}`,
      //       gridTemplateColumns: `${coltem.join(" ")}`
      //     };
      //       return (
      //         <div className="grid" style={GridStyle} key={index}>
      //           {cells.map((item, idx) => {
      //             debugger
      //             const cellitem = item.item;
      //             const type = cellitem && cellitem.type;
      //             switch (type) {
      //               case "grid":
      //                 const grid = cellitem.attrInfo.grid;
      //                 const { rowtem, coltem, cells } = grid;
      //                 const GridStyle = {
      //                   display: "grid",
      //                   gridTemplateRows: `${rowtem.join(" ")}`,
      //                   gridTemplateColumns: `${coltem.join(" ")}`
      //                 };
      //                 return (
      //                   <div className="cell" key={idx}>
      //                     <div className="grid" style={GridStyle}>
      //                       {cells.map((item, ix) => {
      //                         const cellitem = item.item;
      //
      //                         return (
      //                           <div className="cell" key={ix}>
      //                             {cellitem ? this.getFields(cellitem) : ""}
      //                           </div>
      //                         );
      //                       })}
      //                     </div>
      //                   </div>
      //                 );
      //               default:
      //                 return (
      //                   <div className="cell" key={idx}>
      //                     {cellitem ? this.getFields(item.item) : ""}
      //                   </div>
      //                 );
      //             }
      //           })}
      //         </div>
      //       );
      //
      //   })}
      // </div>
        <div>
          {fieldsData.map((items,index)=>{
            const grid = items.attrInfo.grid;
            const { rowtem, coltem, cells } = grid;
            return(
                <Row  gutter={16}>
                  {cells.map((item,idx)=>{
                    const cellitem = item.item;
                    const type = cellitem && cellitem.type;
                    switch (type) {
                      case 'grid':
                        return(
                            <div></div>
                        )
                      default:
                        return(
                            idx===0?
                            <Col lg={6} md={12} sm={24}>
                              {cellitem ? this.getFields(item.item) : ""}
                            </Col>:<Col  xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                                  {cellitem ? this.getFields(item.item) : ""}
                                </Col>
                        )
                    }
                  })}
                </Row>
            )
          })}
        </div>
    );
  }
}

FormDisplay.propTypes = {
  form: PropTypes.object.isRequired,
  fieldsData: PropTypes.array.isRequired,
  formItemLayout: PropTypes.object
};
