import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import Icon from '@material-tailwind/react/Icon';
import H4 from '@material-tailwind/react/Heading4';
import H6 from '@material-tailwind/react/Heading6';
import LeadText from '@material-tailwind/react/LeadText';
import Paragraph from '@material-tailwind/react/Paragraph';
import StatusCard from './../../components/landing/StatusCard';
import MenuTop from './../../assets/img/soto.jpg';

export default function WorkingSection() {
    return (
        <section className="pb-20 bg-gray-100 -mt-32">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap relative z-50">
                    <StatusCard color="red" icon="stars" title="Pelayanan">
                        Restaurant yang memiliki pelayanan bagus yang
                        sudah dibuktikan dengan testimoni pelanggan 
                    </StatusCard>
                    <StatusCard
                        color="lightBlue"
                        icon="autorenew"
                        title="Cepat"
                    >
                        Restaurant yang memiliki pelayanan cepat serta 
                        memiliki koki dan pelayan yang sudah handal pada bidangnya
                    </StatusCard>
                    <StatusCard
                        color="teal"
                        icon="fingerprint"
                        title="Terpercaya"
                    >
                        Restaurant yang memiliki pelayanan bagus dan dipercaya
                        banyak orang karena memiliki menu yang unik dan beda
                    </StatusCard>
                </div>

                <div className="flex flex-wrap items-center mt-32">
                    <div className="w-full md:w-5/12 px-4 mx-auto">
                        <div className="text-blue-gray-800 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                            <Icon name="star" size="3xl" />
                        </div>
                        <H4 color="gray">Top Menu Restaurant</H4>
                        <LeadText color="blueGray">
                            Disamping adalah menu paling favorite yang sudah dirasakan 
                            oleh banyak pelanggan berdasarkan rate yang diberikan, dan
                            sangat direkomendasikan untuk anda.
                        </LeadText>
                    </div>

                    <div className="w-full md:w-4/12 px-4 mx-auto flex justify-center mt-24 lg:mt-0">
                        <Card>
                            <CardImage alt="Card Image" src={MenuTop} />
                            <CardBody>
                                <H6 color="gray">Soto Khas Jawa</H6>
                                <Paragraph color="blueGray">
                                    Soto Khas Jawa merupakan sebuah makanan
                                    yang asli dari daerah jawa, dan makanan 
                                    ini sangat terkenal akan keleyatanannya.
                                </Paragraph>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
