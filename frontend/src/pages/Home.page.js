import react from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import { MacbookScrollDemo } from '../components/Mackscroll';
import { PointerHighlightDemo } from '../components/Selector';
import { AnimatedPinDemo } from '../components/PinDemo';
import  {HeroParallaxDemo} from '../components/Hero-paralex'
import {CardHoverEffectDemo} from '../components/card';
import { StickyScrollRevealDemo } from '../components/Sticky';
import { WobbleCardDemo } from '../components/Wobles';

 const HomePage = () => {
  return (
    <div className="home-container">
    <div>
       <HeroSection/>
      
          <div className='bg-gray-900 text-white'>
           <CardHoverEffectDemo/>
          <MacbookScrollDemo/>
            <PointerHighlightDemo/>
            <div className='flex m-20 justify-center '>
            <AnimatedPinDemo />
            <AnimatedPinDemo />
             <AnimatedPinDemo />
             <AnimatedPinDemo />
            
            </div>
            
             
          </div>

                  <div className='bg-gray-900 text-white pb-20'>
   <ServicesSection/>         
         </div>
          
      
      
          <StickyScrollRevealDemo/>
   
         <div className='bg-gray-900 text-white pb-20'>
                    <HeroParallaxDemo/>
         
         </div>

         <div className='bg-gray-900 text-white'>
             <WobbleCardDemo/>
         </div>
        
       </div>
    </div>
  );
}

export default HomePage;