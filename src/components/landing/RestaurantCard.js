import Image from '@material-tailwind/react/Image';
import H6 from '@material-tailwind/react/Heading6';
import Paragraph from '@material-tailwind/react/Paragraph';
import Button from '@material-tailwind/react/Button';

export default function LandingRestaurantCard({ img, name,visi }) {
    return (
        <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
            <div className="px-6">
                <Image src={img} alt={name} raised />
                <div className="pt-6 text-center">
                    <H6 color="gray">{name}</H6>
                    <Paragraph color="blueGray">{visi}</Paragraph>
                    <div className="flex items-center justify-center">
                        <Button color="lightBlue" ripple="light">
                            Detail
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
