import Navbar from '@/Components/Navbar/Navbar'
import '../Styles/Styles.css'
import '../Styles/qty.css'
import Footer from '@/Components/Footer/Footer'
import Sidebar from '@/Components/Sidebar/Sidebar'
import ScrollToTop from '@/Components/ScrollToTop/ScrollToTop'
import QuickCart from '@/Components/Shared/QuickCart/QuickCart';
import ContextWrapper from '@/context/Contexts'
import Script from 'next/script'

export const metadata = {
    title: `E.Architecture - Home Decor & Metal Furniture in Lebanon`,
    description: `Transform your Lebanese home with E.Architecture's bespoke metal furniture and modern decor. Crafted for style and durability, our designs elevate any space.`,
    icons: {
        icon: `https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG`
    }
}

export default function Layout({children} : {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <head>
     
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
{/* <link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&family=Lora:wght@400&display=swap" rel="stylesheet"/> */}
     <link rel="preload" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&family=Lora:wght@400&display=swap" as="style" />
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&family=Lora:wght@400&display=swap"/>
</noscript>      

<meta name="keywords" content="home decor Lebanon, metal furniture Lebanon, Lebanese home decor, premium home accessories, handcrafted furniture Lebanon, interior design Lebanon, modern home decor, stylish furniture Lebanon, high-quality furniture" />

<meta name="robots" content="index, follow" />

<meta property="og:title" content="E.Architecture - Home Decor & Metal Furniture in Lebanon" />
<meta property="og:description" content="E.Architecture offers premium home decor and handcrafted metal furniture in Lebanon. Explore unique and high-quality designs for your living space." />
<meta property="og:image" content="https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG" />
<meta property="og:url" content="https://earchitecture-lb.com" />
<meta property="og:type" content="website" />

<meta name="twitter:title" content="E.Architecture - Home Decor & Metal Furniture in Lebanon" />
<meta name="twitter:description" content="Explore premium home decor and handcrafted metal furniture from E.Architecture, your go-to online store in Lebanon." />
<meta name="twitter:image" content="https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="apple-touch-icon" sizes="180x180" href="https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG" />
<link rel="canonical" href="https://www.earchitecture-lb.com" />
<link rel="icon" href="https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG" />
           
<Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TDEM2DVPJ6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TDEM2DVPJ6');
        `}
      </Script>

      <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
{`
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Aluminum Trays",
      "item": "https://www.earchitecture-lb.com/aluminum%20trays/products"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Bathroom Accessories",
      "item": "https://www.earchitecture-lb.com/bathroom%20accessories/products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Bookends",
      "item": "https://www.earchitecture-lb.com/bookends/products"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Christmas Collection",
      "item": "https://www.earchitecture-lb.com/christmas%20collection/products"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Coat Hangers",
      "item": "https://www.earchitecture-lb.com/coat%20hangers/products"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Firewood Storage",
      "item": "https://www.earchitecture-lb.com/firewood%20storage/products"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "Key Racks",
      "item": "https://www.earchitecture-lb.com/key%20racks/products"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "name": "Kitchen Accessories",
      "item": "https://www.earchitecture-lb.com/kitchen%20accessories/products"
    },
    {
      "@type": "ListItem",
      "position": 9,
      "name": "Metal Furniture",
      "item": "https://www.earchitecture-lb.com/metal%20furniture/products"
    },
    {
      "@type": "ListItem",
      "position": 10,
      "name": "Plant Boxes",
      "item": "https://www.earchitecture-lb.com/plant%20boxes/products"
    },
    {
      "@type": "ListItem",
      "position": 11,
      "name": "Shelves",
      "item": "https://www.earchitecture-lb.com/shelves/products"
    },
    {
      "@type": "ListItem",
      "position": 12,
      "name": "Tables",
      "item": "https://www.earchitecture-lb.com/tables/products"
    },
    {
      "@type": "ListItem",
      "position": 13,
      "name": "Umbrella Stands",
      "item": "https://www.earchitecture-lb.com/umbrella%20stands/products"
    },
    {
      "@type": "ListItem",
      "position": 14,
      "name": "Wall Art",
      "item": "https://www.earchitecture-lb.com/wall%20art/products"
    },
    {
      "@type": "ListItem",
      "position": 15,
      "name": "Wall Clocks",
      "item": "https://www.earchitecture-lb.com/wall%20clocks/products"
    },
    {
      "@type": "ListItem",
      "position": 16,
      "name": "Wine Storage",
      "item": "https://www.earchitecture-lb.com/wine%20storage/products"
    }
  ]
}
`}
</Script>


           </head>

            <body className='relative bg3'>

                <ContextWrapper>
                    <Navbar/>
                    <Sidebar />
                    <QuickCart/>
                    <ScrollToTop/>
                    <main>
                     {children}
                    </main>
                </ContextWrapper>
                <Footer/>
            </body>
        </html>
    )
}
