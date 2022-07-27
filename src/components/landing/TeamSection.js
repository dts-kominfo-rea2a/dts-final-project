import Title from './../../components/landing/Title';
import RestaurantCard from './../../components/landing/RestaurantCard';
import Image1 from './../../assets/img/header.jpg';

export default function TeamSection() {
    return (
        <section className="pt-20 pb-48">
            <div className="container max-w-7xl mx-auto px-4">
                <Title heading="Jelajahi Resturant">
                    Ayo Jelajahi Restaurant yang mungkin bisa
                    anda jadikan destinasi tempat anda makan dan liburan.
                </Title>
                <div className="flex flex-wrap">
                    <RestaurantCard
                        img={Image1}
                        name="Restaurant 1"
                        visi="-"
                    />
                </div>
            </div>
        </section>
    );
}
