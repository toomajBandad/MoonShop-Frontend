import CarouselMain from "../../components/CarouselMain/CarouselMain";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

export default function Home() {
  return (
    <div className="home__container">
      <div>
        <BreadCrumb />
        <CarouselMain />
        <CategoryBar />
      </div>
    </div>
  );
}
