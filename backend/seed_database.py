"""
Database seeding script - Insert sample data for development/testing.
Run this after initializing tables: python seed_database.py
"""

import sys
import os
sys.path.insert(0, os.path.abspath('.'))

from app.database import db
from datetime import datetime, timedelta

def seed_database():
    """Insert sample data into all tables."""
    
    # Connect to database
    db.connect()
    
    # Sample gallery images
    gallery_data = [
        ("Morning Yoga Session", "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop", "Participants practicing yoga poses", "yoga"),
        ("Gym Training", "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop", "Professional gym training sessions", "training"),
        ("Swimming Pool", "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400&h=300&fit=crop", "Swimming and aquatic exercises", "swimming"),
        ("Fitness Class", "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop", "Group fitness classes", "fitness"),
        ("Nutrition Seminar", "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop", "Educational nutrition workshops", "seminar"),
    ]
    
    # # Sample events
    # today = datetime.now().date()
    # events_data = [
    #     ("Marathon 2024", "Join our annual marathon event", str(today + timedelta(days=15)), "08:00:00", "City Park", "https://images.unsplash.com/photo-1452626038306-c2be7cb36c94?w=400&h=300&fit=crop"),
    #     ("Yoga Workshop", "Beginner yoga workshop with expert instructors", str(today + timedelta(days=7)), "10:00:00", "Studio A", "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop"),
    #     ("Fitness Challenge", "30-day fitness transformation challenge", str(today + timedelta(days=1)), "06:00:00", "All Centers", "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=300&fit=crop"),
    #     ("Swimming Lessons", "Professional swimming lessons for all levels", str(today + timedelta(days=3)), "15:00:00", "Pool Area", "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=400&h=300&fit=crop"),
    # ]
    
    # # Sample team members
    # team_data = [
    #     ("John Smith", "Head Coach", "Expert fitness trainer with 15 years experience", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", "john@fusionfit.com", "+1234567890", "facebook.com/john", "instagram.com/john", "twitter.com/john"),
    #     ("Sarah Johnson", "Yoga Instructor", "Certified yoga and pilates instructor", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", "sarah@fusionfit.com", "+1234567891", "facebook.com/sarah", "instagram.com/sarah", "twitter.com/sarah"),
    #     ("Mike Davis", "Nutritionist", "Registered dietitian and nutrition specialist", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop", "mike@fusionfit.com", "+1234567892", "facebook.com/mike", "instagram.com/mike", "twitter.com/mike"),
    #     ("Emma Wilson", "PT Manager", "Personal training manager and certified trainer", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop", "emma@fusionfit.com", "+1234567893", "facebook.com/emma", "instagram.com/emma", "twitter.com/emma"),
    # ]
    
    # # Sample blog posts
    # blog_data = [
    #     ("Top 10 Fitness Tips for 2024", "Here are the top fitness trends and tips...", "Learn the best practices for achieving your fitness goals", 1, True, datetime.now()),
    #     ("Nutrition Guide for Athletes", "Proper nutrition is key to athletic performance...", "Complete guide to eating for optimal athletic performance", 1, True, datetime.now() - timedelta(days=2)),
    #     ("Yoga Benefits for Mental Health", "Discover how yoga can improve mental wellbeing...", "Explore the mental health benefits of regular yoga practice", 1, True, datetime.now() - timedelta(days=5)),
    #     ("Home Workout Guide", "Effective exercises you can do at home...", "No gym? No problem! Try these home workout routines", 1, False, datetime.now()),
    # ]
    
    # # Sample products
    products_data = [
        ("Yoga Mat", "High-quality non-slip yoga mat perfect for all types of yoga and floor exercises", 29.99, "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=200&fit=crop", "Equipment", 25, True),
        ("Dumbbell Set", "Adjustable dumbbell set 5-50 lbs with easy weight adjustment system", 199.99, "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop", "Equipment", 15, True),
        ("Resistance Bands", "Set of 5 resistance bands with different resistance levels for full body workout", 24.99, "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=300&h=200&fit=crop", "Equipment", 50, True),
        ("Water Bottle", "Sports water bottle 32 oz with leak-proof cap and easy-carry handle", 19.99, "https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=300&h=200&fit=crop", "Accessories", 100, True),
        ("Gym Towel", "Microfiber gym towel set - quick dry and super absorbent", 14.99, "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=200&fit=crop", "Accessories", 75, True),
        ("Protein Shaker", "BPA-free protein shaker with mixing ball and measurement marks", 12.99, "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=300&h=200&fit=crop", "Accessories", 60, False),
        ("Foam Roller", "High-density foam roller for muscle recovery and deep tissue massage", 34.99, "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop", "Equipment", 30, False),
        ("Jump Rope", "Professional speed jump rope with adjustable length and ball bearings", 15.99, "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=300&h=200&fit=crop", "Equipment", 45, False),
    ]
    
    try:
        # Insert gallery data
        print("📸 Seeding gallery...")
        for title, image_url, description, category in gallery_data:
            query = "INSERT INTO gallery (title, image_url, description, category) VALUES (%s, %s, %s, %s)"
            db.execute_query(query, (title, image_url, description, category))
        
        # # Insert events data
        # print("📅 Seeding events...")
        # for title, description, date, time, location, image_url in events_data:
        #     query = "INSERT INTO events (title, description, date, time, location, image_url) VALUES (%s, %s, %s, %s, %s, %s)"
        #     db.execute_query(query, (title, description, date, time, location, image_url))
        
        # # Insert team data
        # print("👥 Seeding team...")
        # for name, role, bio, image_url, email, phone, fb, ig, tw in team_data:
        #     query = """INSERT INTO team (name, role, bio, image_url, email, phone, social_facebook, social_instagram, social_twitter) 
        #               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        #     db.execute_query(query, (name, role, bio, image_url, email, phone, fb, ig, tw))
        
        # # Insert blog data
        # print("📝 Seeding blog posts...")
        # for title, content, excerpt, author_id, published, pub_date in blog_data:
        #     query = """INSERT INTO blog_posts (title, content, excerpt, author_id, published, published_date) 
        #               VALUES (%s, %s, %s, %s, %s, %s)"""
        #     db.execute_query(query, (title, content, excerpt, author_id, published, pub_date))
        
        # # Insert products data
        print("🛍️ Seeding products...")
        product_ids = []
        for name, description, price, image_url, category, stock, is_featured in products_data:
            query = "INSERT INTO products (name, description, price, image_url, category, stock, is_featured) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id"
            db.cursor.execute(query, (name, description, price, image_url, category, stock, is_featured))
            result = db.cursor.fetchone()
            if result:
                product_ids.append((result['id'], name))
        
        # Add multiple images for selected products
        print("📸 Seeding product images...")
        product_images = [
            # Yoga Mat - multiple angles
            (product_ids[0][0], "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=400&fit=crop", 0),
            (product_ids[0][0], "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&h=400&fit=crop", 1),
            (product_ids[0][0], "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=400&fit=crop", 2),
            
            # Dumbbell Set - different views
            (product_ids[1][0], "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=400&fit=crop", 0),
            (product_ids[1][0], "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=400&fit=crop", 1),
            (product_ids[1][0], "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=400&fit=crop", 2),
            
            # Resistance Bands
            (product_ids[2][0], "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=400&fit=crop", 0),
            (product_ids[2][0], "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=400&fit=crop", 1),
        ]
        
        for product_id, image_url, order in product_images:
            query = "INSERT INTO product_images (product_id, image_url, display_order) VALUES (%s, %s, %s)"
            db.execute_query(query, (product_id, image_url, order))
        
        print("\n✅ Database seeding completed successfully!")
        print("📊 Inserted:")
        print(f"   - {len(gallery_data)} gallery items")
        # print(f"   - {len(events_data)} events")
        # print(f"   - {len(team_data)} team members")
        # print(f"   - {len(blog_data)} blog posts")
        print(f"   - {len(products_data)} products")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
    finally:
        db.close()

if __name__ == '__main__':
    seed_database()
