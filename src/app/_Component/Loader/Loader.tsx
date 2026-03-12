import { Bars, Circles } from "react-loader-spinner";


//https://mhnpd.github.io/react-loader-spinner/docs/components/circles
export default function Loader() {
    return (
        <div className="h-screen flex justify-center items-center">
            <Bars
height="80"
width="80"
color="#4fa94d"
ariaLabel="bars-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>
        </div>


    )
}