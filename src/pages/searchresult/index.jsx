import React from 'react'
import Personal from "./Personal";
import MyCalendar from "./MyCalendar";
import { useParams } from 'react-router-dom';

function SearchResult() {

  const {id} = useParams();

  return (
    <>
    <Personal id={id}/>
    <MyCalendar/>
    </>
  );
}

export default SearchResult;
