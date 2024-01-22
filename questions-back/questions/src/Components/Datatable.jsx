import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import './datatable.css'
import Expand from './Expand';
import axios from 'axios'

const columns = [
    {
        name:'Index',
        selector:row=>parseInt(row.index),
        sortable:true,
        width: "7rem"
    },
    {
        name: 'Document Title',
        selector: row => row.document_title,
        sortable:true
    },
    {
        name: 'Question Text',
        selector: row => row.question_text && row.question_text[0].toUpperCase() + row.question_text.slice(1)+' ?',
        sortable:true
    },
];
const ExpandedComponent = ({ data }) => <Expand data={data} />;

class Datatable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            filterdData: "",
            originalData: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getData = this.getData.bind(this);

    }

    handleInputChange(e) {
        const text = e.target.value
        this.setState({
            filterText: text
        })
        const filteredItem = this.state.originalData.filter(item =>
            JSON.stringify(item).toLowerCase().indexOf(text.toLowerCase()) !== -1
        )
        this.setState({
            filterdData: filteredItem
        })
    }
    getData() {
        // const url = process.env.REACT_APP_BACKEND_URL
        const url = 'http://localhost:5000/api/data/'
        axios.get(url).then(res => {
            this.setState({
                filterdData: res.data.data,
                originalData: res.data.data
            })
        }).catch(err => {
            console.error(err);
        })


    }

    componentDidMount() {
        var data = []

        this.setState({
            filterdData: data,
            originalData: data
        })
        this.getData()
    }


    render() {
        return (
            <div>
                <div id="search">
                    <input
                        name='filterText'
                        id="search-input"
                        type="text"
                        placeholder="Filter table data..."
                        value={this.state.filterText}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div id='datatable'>
                    <div id='datatable2'>
                        <DataTable
                            columns={columns}
                            data={this.state.filterdData}
                            direction="auto"
                            expandOnRowClicked
                            expandableRows
                            fixedHeaderScrollHeight="300px"
                            expandableRowsComponent={ExpandedComponent}
                            highlightOnHover
                            pagination
                            responsive
                            subHeaderAlign="right"
                            subHeaderWrap
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Datatable;