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
