import React from 'react'
import { connect } from 'react-redux';


const Notescollections = ({user}) => {
    return (
        <>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col"> Title {user.userName}</th>
                    </tr>
                </thead>
            </table>
        </>
    )
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps,null)(Notescollections)