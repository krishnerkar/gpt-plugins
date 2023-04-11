/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import PluginContent from "@/components/PluginContent";
// import { Result } from "@/pages/api/getByName";
// import { Metadata, ResolvingMetadata } from "next";

// type Props = {
//   params: { name: string };
// };

// export async function generateMetadata(
//   { params }: Props,
//   parent?: ResolvingMetadata
// ): Promise<Metadata> {
//   const name = params.name;

//   // fetch data
//   let description;
//   let logo

//   fetch(`http://localhost:3005/api/getByName?name=${name}`).then((res) => {
//     if (res.ok) {
//       res.json().then((data: Result) => {
//         if (data.error) {
//           console.log(data.error);
//           return;
//         }
//         if (!data.data) return;
//       });
//     } else {
//       res.json().then((data: Result) => {
//         if (data.error) {
//           console.log(data.error);
//           return;
//         } else {
//           console.log("Something went wrong");
//         }
//       });
//     }
//   });

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent)?.openGraph?.images || [];

//   return {
//     title: name,
//     description: description,
//     openGraph: {
//       images: [
//         `hhttp://localhost:3005/api/og?name=${name}&description=${description}&logo=${logo}`,
//         ...previousImages,
//       ],
//     },
//   };
// }

export default function Plugin({ params }: { params: { name: string } }) {
  return <PluginContent name={params.name} />;
}
