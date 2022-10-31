import client from "../../utils/apollo-client";
import { gql } from "@apollo/client";
import Head from "next/head";
import Header from "../../components/Header";
import GardenPlan from "../../components/GardenPlan";

export default function GardenPage({ data }) {
  const { title, planDetails, planning, location } = data.gardenPlan;
  const { actualLength, actualWidth } = planDetails;
  const areas = planning?.areas || [];
  const seedlings = planning?.seedlings || [];

  return (
    <>
      <Head>
        <title>{title} - Myveggiegarden.how</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="bg-gradient-to-r from-green-900 to-green-800">
          <div className="container mx-auto px-4 md:px-8 lg:px-3 py-10 flex flex-wrap flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-white font-semibold text-3xl mb-1 font-serif">
                {title}
              </h1>
              <span className="text-white text-sm">By Robbert Vermeulen</span>
            </div>
            <div>
              <a
                href="#"
                className="flex space-x-3 items-center px-5 py-2 bg-white bg-opacity-40 hover:bg-opacity-60 transition-all rounded-full border border-white border-opacity-40 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#000"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span>Save this garden</span>
                <span className="px-2 bg-white rounded-md text-sm">3</span>
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-2 py-10">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="col-span-full lg:col-span-3">
              <div className="sticky top-10 px-3 md:px-8 lg:px-0">
                <section className="mb-8">
                  <header className="mb-6">
                    <h2 className="font-semibold text-2xl font-serif">
                      Garden details
                    </h2>
                  </header>
                  <ul className="flex flex-wrap">
                    {location && (
                      <li className="w-1/2 lg:w-full py-4 lg:pb-4 border-b">
                        <span className="block font-semibold">Location</span>
                        <span>{`${location.city}, ${location.country}`}</span>
                      </li>
                    )}
                    <li className="w-1/2 lg:w-full py-4 border-b">
                      <span className="block font-semibold">Dimensions</span>
                      <span>{`${actualLength / 2}m x ${
                        actualWidth / 2
                      }m`}</span>
                    </li>
                    <li className="w-1/2 lg:w-full py-4 border-b">
                      <span className="block font-semibold">
                        Garden planner
                      </span>
                      <span>Javi</span>
                    </li>
                    <li className="w-1/2 lg:w-full py-4 border-b">
                      <span className="block font-semibold">Garden facing</span>
                      <span>North</span>
                    </li>
                    <li className="w-1/2 lg:w-full py-4">
                      <span className="block font-semibold">
                        Garden created
                      </span>
                      <span>January, 2, 2020</span>
                    </li>
                  </ul>
                </section>
                <section className="mb-8">
                  <header className="mb-6">
                    <h2 className="font-semibold text-2xl font-serif">
                      Garden pictures
                    </h2>
                  </header>
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                      <div className="bg-slate-600 aspect-square rounded-sm overflow-hidden shadow-sm">
                        <img
                          src="https://i.pinimg.com/originals/8e/40/6c/8e406c4130724757d0f98c6155207313.jpg"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="bg-slate-600 aspect-square rounded-sm overflow-hidden shadow-sm">
                        <img
                          src="https://images.ctfassets.net/zma7thmmcinb/zxJNWVb6GTnbrzqt2PaMm/79ea79c254cbbb9b108876e590edf5ae/raised-wood-garden-bed-Niki-Jabbour.jpg"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="bg-slate-600 aspect-square rounded-sm overflow-hidden shadow-sm">
                        <img
                          src="https://i.pinimg.com/originals/8e/40/6c/8e406c4130724757d0f98c6155207313.jpg"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="bg-slate-600 aspect-square rounded-sm overflow-hidden shadow-sm">
                        <img
                          src="https://images.ctfassets.net/zma7thmmcinb/zxJNWVb6GTnbrzqt2PaMm/79ea79c254cbbb9b108876e590edf5ae/raised-wood-garden-bed-Niki-Jabbour.jpg"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="bg-slate-600 aspect-square rounded-sm overflow-hidden shadow-sm">
                        <img
                          src="https://i.pinimg.com/originals/8e/40/6c/8e406c4130724757d0f98c6155207313.jpg"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="bg-slate-600 aspect-square rounded-sm overflow-hidden shadow-sm">
                        <img
                          src="https://images.ctfassets.net/zma7thmmcinb/zxJNWVb6GTnbrzqt2PaMm/79ea79c254cbbb9b108876e590edf5ae/raised-wood-garden-bed-Niki-Jabbour.jpg"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="col-span-full lg:col-span-9">
              <div className="px-3 md:px-8 lg:px-0">
                <div className="mb-8">
                  <GardenPlan
                    actualLength={actualLength}
                    actualWidth={actualWidth}
                    areas={areas}
                    seedlings={seedlings}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query GardenPlan {
        gardenPlan(id: "${params.slug}", idType: SLUG) {
          title
          planDetails {
            actualLength
            actualWidth
            location {
              city
              country
            }
          }
          planning
        }
      }
    `,
  });

  return {
    props: {
      data: data,
    },
  };
}
