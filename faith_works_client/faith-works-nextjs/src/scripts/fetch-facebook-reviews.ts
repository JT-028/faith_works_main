import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../lib/dbConnect";
import Testimonial from "../models/Testimonial";

dotenv.config({ path: ".env.local" });

const PAGE_ID = process.env.FB_PAGE_ID;
const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

async function fetchFacebookReviews() {
  if (!PAGE_ID || !ACCESS_TOKEN) {
    console.error("Missing FB_PAGE_ID or FB_PAGE_ACCESS_TOKEN in environment variables.");
    console.error("Please add them to your .env.local file.");
    process.exit(1);
  }

  console.log("Connecting to database...");
  await dbConnect();
  console.log("Connected to MongoDB.");

  try {
    console.log(`Fetching reviews from Facebook Graph API for page: ${PAGE_ID}...`);
    // The endpoint fetches ratings/reviews. We request specific fields: reviewer, review_text, rating, created_time
    const endpoint = `https://graph.facebook.com/v20.0/${PAGE_ID}/ratings?fields=reviewer,review_text,rating,created_time&access_token=${ACCESS_TOKEN}`;
    
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.error) {
      console.error("Error returned by Facebook API:", JSON.stringify(data.error, null, 2));
      return;
    }

    const reviews = data.data || [];
    console.log(`Found ${reviews.length} reviews from API. Saving to database...`);

    let savedCount = 0;
    for (const review of reviews) {
      // Only process if there is actual review text and a reviewer
      if (review.review_text && review.reviewer?.name) {
        await Testimonial.findOneAndUpdate(
          { reviewerName: review.reviewer.name, reviewText: review.review_text },
          { 
            reviewerName: review.reviewer.name, 
            reviewText: review.review_text,
            rating: review.rating || null,
            date: review.created_time,
            sourceUrl: `https://www.facebook.com/${PAGE_ID}/reviews`
          },
          { upsert: true, new: true }
        );
        savedCount++;
      }
    }

    console.log(`Successfully saved/updated ${savedCount} testimonials in the database.`);

  } catch (error) {
    console.error("An error occurred during the API fetch process:", error);
  } finally {
    console.log("Closing database connection...");
    await mongoose.disconnect();
    console.log("Done.");
  }
}

fetchFacebookReviews();