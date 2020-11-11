import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import{ Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Artist} from './pageStyles/pageStyles'
import {COLORS} from "../constants"

const ArtistsPage = () => {
    const {wpcontent:{
        page:{
            artistsMeta:{ artistsPageDescription, artistsPageHeaderPicture },
        },
        artists:{edges: artists}
    }} = useStaticQuery(graphql`
        query {
    wpcontent {
        page(id: "artists", idType: URI) {
        artistsMeta {
            artistsPageDescription
            artistsPageHeaderPicture {
            altText
            sourceUrl
            imageFile{
                childImageSharp{
                    fluid(quality: 100){
                    ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                    
                }
            }
            
        }
        
       }
    artists {
      edges {
        node {
          artist {
            artistName
            firstName
            lastName
            profile {
                  altText
                  sourceUrl
                  imageFile{
                    childImageSharp{
                      fluid(quality: 100, grayscale: true){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
          }
          slug
        }
      }
    }
    }
    }

`)
    return(<Layout>
        <SEO title="Artists"/>
        <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
            <div className="banner">
                <Image fluid={artistsPageHeaderPicture.imageFile.childImageSharp.fluid} alt={artistsPageHeaderPicture.altText}/>
                <BottomEdgeDown color={COLORS.SECONDARY}/>
            </div>
            <div className="description">
                <h2>Peeters Agency</h2>
                <p>{artistsPageDescription}</p>
                <BottomEdgeUp color={COLORS.Black}/>
            </div>
            <div className="artists">
                <h2>Our Artists</h2>
                <div className="artists-items">
                    {artists.map(({node: {artist, slug}}) => (
                        <Artist to={`/${slug}`} key={slug}>
                            
                            <div className="artist-info">
                             <p>{artist.firstName} {artist.lastName}</p>
                             {artist.artistName && <p>{artist.artistName}</p>}
                            </div>
                        </Artist>
                    ))}
                </div>
            </div>
        </Wrapper>
    </Layout>

    )
}
// <Image fluid={artists.profile.imageFile.childImageSharp.fluid} alt={artist.profile.altText}/>
export default ArtistsPage