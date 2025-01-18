import client from '@/database/mongodb';
import type {  NextApiResponse } from 'next';
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'


import nodemailer from 'nodemailer';
import { nanoid } from 'nanoid'
import totalCal from '@/Utils/totalCal';
// import { ObjectId } from 'mongodb';

const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 465,
    secure: true,
    auth: {
        user: "earchitecture-lb.com",
        pass: "POX4WTUnaDYXWV5l",
    },
});



 async function sendOrderConfirmationEmail(discountedPrice: number | undefined,orderId: string, toEmail: string, order: any[]): Promise<boolean> {
    try {
        // let orderId = nanoid()
        // orderId = `${orderId}`.replace(/[^a-zA-Z0-9]/g, '')?.slice(0,6)?.toUpperCase()
        let total = discountedPrice ? discountedPrice : totalCal(order);

        // Create dynamic HTML content based on the order data
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                header {
                    text-align: center;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ccc;
                }
        
                h1 {
                    color: #333;
                }
        
                p {
                    color: #666;
                }
        
                .buttons {
                    text-align: center;
                    margin: 0 auto;
                    color: white;
                    margin-top: 20px;
                    width:max-content;
                    
                }
        
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    text-decoration: none;
                    color: white !important;
                    margin-top:4px !important;
                    width:max-content;
                    background-color: #2a393c;
                    border-radius: 3px;
                }
        
                .order-id {
                    margin-top: 20px;
                    color: #333;
                }
        
                .product {
                    margin-top: 20px;
                    border-top: 1px solid #ccc;
                    padding-top: 10px;
                    display: flex;
                }
        
                .product img {
                    max-width: 150px;
                    max-height: 150px;
                    margin-right: 10px;
                }
        
                .product-details {
                    flex-grow: 1;
                }
        
                .product-title {
                    font-weight: bold;
                    color: #333;
                }
        
                .product-description {
                    color: #666;
                }
        
                .product-price {
                    color: #333;
                }
                .centered {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin:0 auto;
                }
                .class12 {
                    padding:1;
                    objectFit:contain !important;
                    width: 100px !important;
                    height: 100px !important;
                }
                .font1 {
                    font-size:1.2em;
                }
                footer {
                    background-color: #333;
                    color: white;
                    margin: 0 auto;
                    padding: 20px;
                    text-align: center;
                  }
              
                  footer a {
                    text-align: center;
                    margin: 0 auto;
                    color: white;
                    text-decoration: none;
                  }
                  .col {
                    flex-direction: column;
                  }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                <div class='class12'>
    <img
    style="width:100px;height:100px"
        class='img contain'
        src="https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG"
        alt="EArchitecture logo"/> 
</div>
                <h1>EArchitecture</h1>
                <p>Thank you for shopping with us! Your order is confirmed and will be processed shortly.</p>
                </header>
        
                <div class="buttons">
                    <a href="https://wa.me/+96181303139" class="button">Reach Us</a>
                    <a href="https://earchitecture-lb.com/" class="button">Visit Our Website</a>
                </div>
        
                <div class="order-id">
                    <p>Order ID:
                    <strong>
                    ${orderId}
                    </strong>
                    </p>
                </div>
                 <div class="order-id">
                    <p>Order Total:
                    <strong>
                   $${Number(discountedPrice)}
                    </strong>
                    </p>
                </div>
        
                ${
                    order && order.map(product => {
                        if (!product?._id) return '';
                        return `
                            <div class="product">
                                <div style="max-width:150px;max-height:150px;min-height:50px;">
                                    <img src='${product?.img}' alt="Product Image">
                                </div>
                                <div class="product-details" ></div>
                                    <p class="product-title">${product?.title}</p>
                                    <p class="product-description">
                                        Quantity: ${product?.qty}
                                    </p>
                                </div>
                            </div>
                        `;
                    }).join('')
                }
                
                <hr/>
  
                
                <div class='font1'>
                ${
                `Order Total:
                <strong>
                $${Number(discountedPrice)}
                </strong>
                `
                }
                </div>
        
               
            </div>
        </body>
        <footer>
        <br />
        <div style='text-align:center;align-items:center;margin:0 auto;'>
        <p><a href="mailto:info@earchitecture-lb.com">info@earchitecture-lb.com</a></p>
        <p style='padding-top:2px;padding-bottom:2px;'>+961 81 303139</p>
        <p><a href="https://earchitecture-lb.com/unsubscribe">unsubscribe</a></p>
        </div>
      </footer>
        </html> `;

        // Send the email
        const info = await transporter.sendMail({
            from: '"EArchitecture" <info@earchitecture-lb.com>',
            to: toEmail,
            subject: "Thank You For Your Order!",
            html: htmlContent,
        });

        console.log("Email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

async function sendAdminNotificationEmail(orderId: string, order: any[], discountedPrice: number | undefined): Promise<boolean> {
    try {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                header {
                    text-align: center;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ccc;
                }
        
                h1 {
                    color: #333;
                }
        
                p {
                    color: #666;
                }
        
                .order-id {
                    margin-top: 20px;
                    color: #333;
                }
        
                .product {
                    margin-top: 20px;
                    border-top: 1px solid #ccc;
                    padding-top: 10px;
                    display: flex;
                }
        
                .product img {
                    max-width: 150px;
                    max-height: 150px;
                    margin-right: 10px;
                }
        
                .product-details {
                    flex-grow: 1;
                }
        
                .product-title {
                    font-weight: bold;
                    color: #333;
                }
        
                .product-description {
                    color: #666;
                }
        
                .product-price {
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                    <h1>New Order Notification</h1>
                    <p>A new order has been placed in your store.</p>
                </header>
        
                <div class="order-id">
                    <p>Order ID: <strong>${orderId}</strong></p>
                    <p>Order Total: <strong>$${Number(discountedPrice)}</strong></p>
                </div>
        
                ${order.map(product => {
                    if (!product?._id) return '';
                    return `
                        <div class="product">
                            <div style="max-width:150px;max-height:150px;min-height:50px;">
                                <img src='${product?.img}' alt="Product Image">
                            </div>
                            <div class="product-details">
                                <p class="product-title">${product?.title}</p>
                                <p class="product-description">Quantity: ${product?.qty}</p>
                            </div>
                        </div>
                    `;
                }).join('')}
        
                <hr/>
                <p><strong>Thank you for your attention!</strong></p>
            </div>
        </body>
        </html>`;

        // Send the email to the admin
        const info = await transporter.sendMail({
            from: '"EArchitecture" <info@earchitecture-lb.com>',
            to: 'info@earchitecture-lb.com',  // Admin email
            subject: `New Order Received - ${orderId}`,
            html: htmlContent,
        });

        console.log("Admin email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending admin email:", error);
        return false;
    }
}


export async function POST(req: NextRequest, res: NextApiResponse) {
    const { order } = await req.json();
  
    let orderId = '';
    do {
      orderId += nanoid().replace(/\D/g, '');
    } while (orderId.length < 8);
    
    orderId = orderId.slice(0, 8);
    let orderTotal = order?.orderTotal || 0;
  
    if (req.method === 'POST') {
      if (!order || !order?.info?.phone) {
        return NextResponse.json({ success: false });
      }
  
      const insertReq = await client.db("EA").collection("Orders").insertOne({
        ...order,
        orderID: `${orderId}`,
      });
  
      await client.db("EA").collection("OrdersBACKUP").insertOne({
        ...order,
        orderID: `${orderId}`,
      });
  
      if (insertReq.acknowledged) {
        // Send confirmation email to customer
        const emailSent = await sendOrderConfirmationEmail(
          orderTotal,
          orderId,
          `${order?.info?.email}`,
          order?.products
        );
  
        // Send notification to admin
        const adminEmailSent = await sendAdminNotificationEmail(
          orderId,
          order?.products,
          orderTotal
        );
  
        if (emailSent && adminEmailSent) {
          return NextResponse.json({ success: true, orderId });
        }
      }
    }
  
    return NextResponse.json({ success: false });
  }



