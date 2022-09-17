import React, {useEffect} from 'react';
import {Pagination} from "react-bootstrap"
import {connect} from "react-redux";
import {setPagesInfo} from "../../../reducers/users-reducer";

const Paginator = (props) => {
    let active = props.pagesInfo.page
    let items = []
    for (let number = 1; number <= props.pagesInfo.totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => props.setPagesInfo({
                limit: props.pagesInfo.limit,
                nextPage: number + 1,
                page: number,
                prevPage: number - 1,
                totalPages: props.pagesInfo.totalPages})}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Pagination>
                <Pagination.Prev onClick={() => props.setPagesInfo({
                    limit: props.pagesInfo.limit,
                    nextPage: props.pagesInfo.nextPage - 1,
                    page: props.pagesInfo.page - 1,
                    prevPage: props.pagesInfo.prevPage - 1,
                    totalPages: props.pagesInfo.totalPages})}/>

                {items}

                <Pagination.Next onClick={() => props.setPagesInfo({
                    limit: props.pagesInfo.limit,
                    nextPage: props.pagesInfo.nextPage + 1,
                    page: props.pagesInfo.page + 1,
                    prevPage: props.pagesInfo.prevPage + 1,
                    totalPages: props.pagesInfo.totalPages})}/>
            </Pagination>
        </div>
    );
};

export default Paginator;
