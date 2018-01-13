import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
import YTSearch from 'youtube-api-search'
const API_KEY='AIzaSyBqtieVTxP5MItFW9uY0THDqxRJCuictfw';



//Create a new component. This component should
//produce some HTML

class App extends Component{

     constructor(props)
     {
       super(props);
       this.state={
         videos:[],
          selectedVideo:null
          };
      this.videoSearch('Jagga Jasoos');
     }

    videoSearch(term)
    {
      YTSearch({key:API_KEY,term:term},(videos)=>{
                                    this.setState({videos:videos,selectedVideo:videos[0]});
                                                  }
              );


    }
     render(){
       const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);
     return (
       <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={selectedVideo=>{this.setState({selectedVideo})}} videos={this.state.videos} />
        </div>

     );
   }
};

//Take this component's generated HTML and put it on the page(in the DOM)
ReactDOM.render(<App />,document.querySelector('.container'));
