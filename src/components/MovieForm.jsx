import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";




class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      releaseDate:"",
    },
    genres: [],
    errors: {},
    
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("نرخ روزانه"),
    releaseDate: Joi.string()
      .required()
      .min(8)
      .max(8)
      .label("Date Of Release")
  };


  
 

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  handleCancel=()=>{
    this.props.history.push("/movies");
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      releaseDate: movie.releaseDate
    };
  }
  
  doSubmit = async () => {
   try {
    await saveMovie(this.state.data); 
    await toast.success('ثبت با موفقیت انجام پذیرفت', {position: toast.POSITION.TOP_LEFT});
  
    this.props.history.push("/movies"); 
  } catch (error) {
    toast.error('خطا در ثبت اطلاعات', {position: toast.POSITION.TOP_LEFT});
   }
  
  };

  render() {
    return (
     
       <div className="col-md-5 container justify-content-center">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderDate("releaseDate", "Date Of Release")}
          <button  className="btn btn-primary m-3 pull-right" onClick={this.handleCancel}>Cancel</button>
          {this.renderButton("Save",true,"btn btn-primary m-3 pull-left")}
          
          
        </form>
      </div>
     
    );
  }
}

export default MovieForm;
