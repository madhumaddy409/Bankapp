import React from 'react'
import {connect} from 'react-redux'

import './spinner.css';

const Spinner = ({ isLoading }) => (
    <>
    {
        isLoading ? (<div id="spinner-fade">
        <div className="default-spinner spinner-border" role="status"></div>

    </div>): null
    }
        
    </>
)
const mapStateToProps = state => ({
    isLoading: state.loading
})

export default connect(mapStateToProps)(Spinner);