import React from 'react'
import HeroBanner from './HeroSection'
import ProductRail from './NewArrivals'
import { getBestSellers, getFeaturedCollections, getFeaturedVideo, getNewArrivals } from '@/lib/shopify';
import CategoryTiles from './FeaturedCollection';
import { FeaturedVideoPlayer } from './FeaturedVideoPlayer';
import Reviews from './Reviews';
import InstagramFeed from './InstagramFeed';

const Index = async () => {
const [newArrivals, bestSellers, featuredCollections, featuredVideo] = await Promise.all([
  getNewArrivals(),
  getBestSellers(),
  getFeaturedCollections(),
  getFeaturedVideo(),
]);
    return (
        <>
            <HeroBanner />
            <ProductRail
                title="New Arrivals"
                viewAllHref="/collections/new-arrivals"
                products={newArrivals}
            />
            <ProductRail
                title="Best Sellers"
                viewAllHref="/collections/best-sellers"
                products={bestSellers}
            />
            <CategoryTiles collections={featuredCollections} />
            {featuredVideo && featuredVideo.videoSrc && <FeaturedVideoPlayer {...featuredVideo} />}
            <Reviews />
            <InstagramFeed />
        </>
    )
}

export default Index