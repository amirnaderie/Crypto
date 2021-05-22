import React,{useEffect} from "react";
import {fetchGenres,selectGenre  } from '../../redux/slices/moviesCategorySlice';
import { connect } from "react-redux"

const ListGroup = (props) => {
 const {textProperty,valueProperty,selectedItem,
  genresListdata,apiStatus,fetchGenres,selectGenre}=props

  useEffect(() => {
    if (apiStatus === 'idle') {
    fetchGenres();
    }
  }, [apiStatus]);
  
  const ItemSelect = item => {
    selectGenre(item);
  }; 

  return (
    <ul className="list-group">
      {apiStatus === 'succeeded' && genresListdata.map(item => (
        <li
          onClick={() => ItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

const mapStateToProps = state => ({
  genresListdata: state.genres.genreList,
  selectedItem: state.genres.selectedGenre,
  apiStatus: state.genres.status,

})

export default connect(mapStateToProps, {fetchGenres,selectGenre})(ListGroup)


//export default ListGroup;
