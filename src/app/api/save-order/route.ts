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
    <title>Thank You for Your Order</title>
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
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        header {
            text-align: center;
            margin-bottom: 20px;
        }

        header img {
            width: 80px;
            height: auto;
            margin-bottom: 10px;
        }

        header h1 {
            font-size: 1.5rem;
            color: #333333;
            margin: 0;
        }

        .order-summary {
            margin-bottom: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .order-summary h2 {
            font-size: 1.2rem;
            color: #333333;
            margin-bottom: 10px;
        }

        .product-item {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }

        .product-item:last-child {
            border-bottom: none;
        }

        .product-item img {
            width: 70px;
            height: auto;
            margin-right: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        .product-details {
            flex-grow: 1;
        }

        .product-title {
            font-weight: bold;
            font-size: 1rem;
            color: #333333;
            margin: 0 0 5px;
        }

        .product-quantity {
            font-size: 0.9rem;
            color: #666666;
            margin: 0;
        }

        .order-total {
            text-align: right;
            font-size: 1.1rem;
            font-weight: bold;
            color: #333333;
            margin-top: 20px;
        }

        .cta-buttons {
            text-align: center;
            margin-top: 30px;
        }

        .cta-buttons a {
            display: inline-block;
            margin: 0 10px;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
            font-size: 0.9rem;
        }

        .cta-buttons a:hover {
            background-color: #0056b3;
        }

        footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px 10px;
            background-color: #333333;
            color: #ffffff;
            font-size: 0.9rem;
        }

        footer a {
            color: #ffffff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <img src="https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG" alt="EArchitecture Logo">
            <h1>Thank You for Your Order!</h1>
            <p>Your order has been received and is being processed. Order ID: ${orderId}</p>
        </header>
        
        <div class="order-summary">

            <h2>Order Details</h2>

        
            ${order.map(product => `
            <div class="product-item">
                <img src="${product.img}" alt="${product.title}">
                <div class="product-details">
                    <p class="product-title">${product.title}</p>
                    <p class="product-quantity">Quantity: ${product.qty}</p>
                </div>
            </div>
            `).join('')}
        </div>

        <p class="order-total">Order Total: $${Number(discountedPrice).toFixed(2)}</p>

        <div class="cta-buttons">
            <a href="https://wa.me/+96181303139" style="background-color: #28a745;">Contact Us</a>
            <a href="https://earchitecture-lb.com/" style="background-color: #007bff;">Visit Our Website</a>
        </div>
    </div>

    <footer>
        <p>Email: <a href="mailto:info@earchitecture-lb.com">info@earchitecture-lb.com</a></p>
        <p>Phone: +961 81 303139</p>
        <p><a href="https://earchitecture-lb.com/unsubscribe">Unsubscribe</a></p>
    </footer>
</body>
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
                        <div class="product" style="display: flex; margin-bottom: 20px;">
                <div style="max-width:150px;max-height:150px;min-height:50px;">
                    <img src='${product?.img}' alt="Product Image" style="width:100%; height:auto;">
                </div>
                <div class="product-details" style="flex-grow: 1; margin-left: 10px;">
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



