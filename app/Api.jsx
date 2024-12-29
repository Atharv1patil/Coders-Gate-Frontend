import { create } from "apisauce";


const api = create({
    baseURL: "http://192.168.43.89:1337/api",
    headers: {
       "X-API-KEY": "b2460d1c31bde0aee1bffcddd0b7b2dd934f1aeccd78cbe07eb29b03c87ed4cf88bbaef8b7a39252e7267a64578f8a034533bd02ac46cbe85134a40ece9841635f1c093f85f456156f87f985d99301d5b8082cbe9713f7e689d74bdf62d4593878a9c355dca7f6cb2e8770e21835a59435718f356f3dc0c9bd6af8dcb8a025fd"
    },
    timeout: 10000,
});

const getSlider = () => 
{
    try{
        const response = api.get("/sliders?populate=*");
        console.log(response);
        return response;
        
    } catch (error) {
        console.log(error);
    }
}
const getVideocourse = () => 
{
    try{
        const response1 = api.get("/video-courses?populate=*");
        console.log( "response- video",response1);
        return response1;
        
    } catch (error) {
        console.log(error);
    }
}

const getcourselist = (type) =>{
  try {
    const response2 = api.get(`/course-lists?filters[Type][$eq]=${type}&populate=*`);
    console.log("response - course",response2);
    return response2;                                                   
  } catch(error)
  {
    console.log(error);
  }
}
const coursecontent = async (type,id) => {
    try {
      const response3 = await api.get(`/course-lists?filters[Type][$eq]=${type}&populate[Topic][populate][content]=*&filters[Topic][id][$eq]=${id}`);
      console.log("Course content: ", response3.data); // Log the actual data
      return response3; // Return the data if needed
    } catch (error) {
      console.error("Error fetching course content: ", error.message);
    }
  };
  


export default 
{
    getSlider,
    getVideocourse,
    getcourselist,
    coursecontent
}
