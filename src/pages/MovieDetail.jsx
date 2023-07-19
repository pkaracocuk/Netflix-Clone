import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { baseImgUrl, options } from '../constants/constants'
import { Splide,SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import ReactPlayer from 'react-player'




const MovieDetail = () => {
 const {movie_id} = useParams()
 const [movieData,setMovieData]=useState(null);
 const[credits,setCredits]=useState(null);
 const [latestVideo, setLatestVideo] = useState(null);
 
 



 useEffect(()=>{
  axios.get(`/movie/${movie_id}`,options)
  .then((res)=>setMovieData(res.data))
  .catch((err)=>console.log(err))
 },[])


 useEffect(()=>{
  axios.get(`/movie/${movie_id}/credits`,options)
  .then((res)=>setCredits(res.data))
  .catch((err)=>console.log(err))
},[])
  

useEffect(() => {
  axios
    .get(`/movie/${movie_id}/videos`, options)
    .then((res) => {
      const videosData = res.data.results;
      const latestVideoData = videosData[videosData.length - 1];
        setLatestVideo(latestVideoData);
      })
      .catch((err) => console.log(err));
  }, []);


  
  



 const sum= movieData?.revenue -movieData?.budget;
 
 if(!movieData) return 'Loading...'
 if(!credits) return 'Loading...'
 
 
  return (

  <div className='movie-detail row p-4 '>
    <div className='col-md-6 d-flex align-items-center position-relative'> 
      <img style={{maxWidth:'500px'}} className='rounded p-4' src={`${baseImgUrl}${movieData.poster_path}`}/>
      
      <span className='position-absolute bg-warning rounded p-1 shadow top-0 ms-5 mt-5 p-2'>{movieData.vote_average.toFixed(1)}</span>
      </div>
    <div className='col-md-6 d-flex flex-column'>
        <h1 className='text-warning'>{movieData.title}</h1>
        <p>{movieData.overview}</p>
        <div className='row'>
      <div className='col-6 col-md-12'>
        <p>Budget: {movieData.budget}$</p>
        <p>Revenue: {movieData.revenue}$</p>
        <p>{sum >= 0 ? 'Profit': 'Loss'}: {sum}$</p>
      </div>
      <div className='col-6 col-md-12'>
        <div className='d-flex gap-3'>
        Categories:
        {movieData.genres.map((item)=>(
          <p className='badge bg-warning'>{item.name}</p>
        ))}
        </div>
        <div className='d-flex gap-3'>
          Spoken Languages:
          {movieData.spoken_languages.map((lang)=>(
            <p className='badge bg-danger'>{lang.name}</p>
          ))}
        </div>
        <div>
          Production Companies:
          {movieData.production_companies.map((comp)=>(
            
            <div className='d-flex gap-3 align-items-center mt-2'>
              {comp.logo_path && (
                <img style={{maxWidth:'140px',}} src={`${baseImgUrl}${comp.logo_path}`}/>
              )}
               <div>
              {comp.logo_path && (
                <p className='text-warning'>{comp.name}</p>
              )}
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    <div className='d-flex flex-column gap-4 justify-content-center p-4'>
      <div className='d-flex flex-column align-items-center'>
        <h3 className='text-warning'>{latestVideo.name}</h3>
        <ReactPlayer
                url={`https://www.youtube.com/watch?v=${latestVideo.key}`}
                controls
                width="800px"
                height="400px"
              />

      </div>
    <div className='credits'>
      <h4 className='text-light'>Actors:</h4>
        <Splide
          options={{
            perPage: 5,
            gap: '10px',
            pagination: false,
          }}
        >
          {credits.cast.map((cast) => (
            <SplideSlide>
              <div>
                
                {cast.profile_path && (<img style={{maxWidth:'250px'}} src={`${baseImgUrl}${cast.profile_path}`}/>)}
                <div className='d-flex gap-2'>
              <p className='text-warning'>{cast.name}</p>
              <p>{cast.character}</p>
              </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      </div>
    </div>
  );
};

export default MovieDetail;