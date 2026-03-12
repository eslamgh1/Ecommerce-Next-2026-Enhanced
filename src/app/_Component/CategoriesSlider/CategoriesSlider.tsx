import { getAllCategories } from "_/app/_services/categories.service"
import MySwiper from "../MySwiper/page"



export default async function CategoriesSlider() {

const allCategories = await getAllCategories()

if (allCategories == null){
    return;
}

    return (
        <div>
            <MySwiper spaceBetween={30} slidesPerView={7} imageList={allCategories.map(category=>category.image)} />
        </div>
    )
}