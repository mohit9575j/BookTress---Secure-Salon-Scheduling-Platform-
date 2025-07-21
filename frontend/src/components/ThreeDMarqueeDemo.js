"use client";
import { ThreeDMarquee } from "./ui/3d-marquee";

export function ThreeDMarqueeDemo() {
  const images = [
       "https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg","https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg",
    "https://img1.wsimg.com/isteam/ip/ecf2eb3f-f55b-4193-9e98-7c1b626bf779/Hero%20Picture.png",
    "https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg",
"https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg",
"https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg",
"https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg",
"https://img.freepik.com/premium-vector/barber-salon-poster-banner-template-flat-design-social-media_618890-526.jpg", 
"https://www.shutterstock.com/image-vector/barber-shop-haircut-beauty-salons-260nw-511270507.jpg",
"https://i.pinimg.com/736x/c9/78/2d/c9782d5e659d59875096c342708e10b0.jpg",
"https://png.pngtree.com/thumb_back/fw800/background/20220616/pngtree-barbershop-and-mens-beauty-salon-advertisement-a-confident-bearded-hipster-getting-a-stylish-haircut-from-skilled-barber-photo-image_45814552.jpg",
    
  ];
  return (
    <div
      className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
