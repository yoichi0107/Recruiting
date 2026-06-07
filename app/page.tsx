import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyNow from '@/components/WhyNow';
import About from '@/components/About';
import WhatYouDo from '@/components/WhatYouDo';
import WhoWeLookFor from '@/components/WhoWeLookFor';
import Conditions from '@/components/Conditions';
import Process from '@/components/Process';
import Message from '@/components/Message';
import ApplyForm from '@/components/ApplyForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyNow />
        <About />
        <WhatYouDo />
        <WhoWeLookFor />
        <Conditions />
        <Process />
        <Message />
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
