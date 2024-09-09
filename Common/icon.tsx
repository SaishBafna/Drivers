import React, {useEffect, useRef} from 'react';
import type {SVGProps} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import Svg, {Path, Polygon, G, Defs, ClipPath, Circle} from 'react-native-svg';

export function LogosGoogle(props: SVGProps<SVGSVGElement>) {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24.43}
        height={25}
        viewBox="0 0 256 262"
        {...props}>
        <Path
          fill="#4285f4"
          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></Path>
        <Path
          fill="#34a853"
          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></Path>
        <Path
          fill="#fbbc05"
          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></Path>
        <Path
          fill="#eb4335"
          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></Path>
      </Svg>
    </View>
  );
}

export function LogosApple(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20.32}
      height={25}
      viewBox="0 0 256 315"
      {...props}>
      <Path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262"></Path>
    </Svg>
  );
}

export function LogosGoogleGmail(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26.23}
      height={20}
      viewBox="0 0 256 193"
      {...props}>
      <Path
        fill="#4285f4"
        d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"></Path>
      <Path
        fill="#34a853"
        d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"></Path>
      <Path
        fill="#ea4335"
        d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"></Path>
      <Path
        fill="#fbbc04"
        d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"></Path>
      <Path
        fill="#c5221f"
        d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"></Path>
    </Svg>
  );
}

export function IconoirEye(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 256 256"
      {...props}>
      <Path
        fill="#000"
        d="M251 123.13c-.37-.81-9.13-20.26-28.48-39.61C196.63 57.67 164 44 128 44S59.37 57.67 33.51 83.52C14.16 102.87 5.4 122.32 5 123.13a12.08 12.08 0 0 0 0 9.75c.37.82 9.13 20.26 28.49 39.61C59.37 198.34 92 212 128 212s68.63-13.66 94.48-39.51c19.36-19.35 28.12-38.79 28.49-39.61a12.08 12.08 0 0 0 .03-9.75m-46.06 33C183.47 177.27 157.59 188 128 188s-55.47-10.73-76.91-31.88A130.4 130.4 0 0 1 29.52 128a130.5 130.5 0 0 1 21.57-28.11C72.54 78.73 98.41 68 128 68s55.46 10.73 76.91 31.89A130.4 130.4 0 0 1 226.48 128a130.5 130.5 0 0 1-21.57 28.12ZM128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44m0 64a20 20 0 1 1 20-20a20 20 0 0 1-20 20"></Path>
    </Svg>
  );
}

export function IconoirEyeOff(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        fill="#000"
        d="M4.707 3.293a1 1 0 0 0-1.414 1.414l2.424 2.424c-1.43 1.076-2.678 2.554-3.611 4.422a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19c1.555 0 3.1-.355 4.53-1.055l2.763 2.762a1 1 0 0 0 1.414-1.414zm10.307 13.135c-.98.383-2 .572-3.014.572c-2.969 0-6.002-1.62-7.87-5c.817-1.479 1.858-2.62 3.018-3.437l2.144 2.144a3 3 0 0 0 4.001 4.001zm3.538-2.532c.483-.556.926-1.187 1.318-1.896c-1.868-3.38-4.9-5-7.87-5c-.112 0-.224.002-.336.007L9.879 5.223A10.215 10.215 0 0 1 12 5c3.903 0 7.736 2.236 9.894 6.553a1 1 0 0 1 0 .894a13.106 13.106 0 0 1-1.925 2.865z"></Path>
    </Svg>
  );
}

export function IconamoonMenuBurgerHorizontal(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6h18M3 12h18M3 18h18"></Path>
    </Svg>
  );
}

export function ClarityNotificationLine(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 36 36"
      {...props}>
      <Path
        fill="#000"
        d="M32.51 27.83A14.4 14.4 0 0 1 30 24.9a12.6 12.6 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.6 12.6 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93a1 1 0 0 0-.34.75v1.36a1 1 0 0 0 1 1h27.8a1 1 0 0 0 1-1v-1.36a1 1 0 0 0-.34-.75M5.13 28.94a16.2 16.2 0 0 0 2.44-3a14.2 14.2 0 0 0 1.65-5.85v-4.94a8.74 8.74 0 1 1 17.47 0v4.94a14.2 14.2 0 0 0 1.65 5.85a16.2 16.2 0 0 0 2.44 3Z"
        className="clr-i-outline clr-i-outline-path-1"></Path>
      <Path
        fill="#000"
        d="M18 34.28A2.67 2.67 0 0 0 20.58 32h-5.26A2.67 2.67 0 0 0 18 34.28"
        className="clr-i-outline clr-i-outline-path-2"></Path>
      <Path fill="none" d="M0 0h36v36H0z"></Path>
    </Svg>
  );
}

export function MdiClockOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        fill="#000"
        d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z"></Path>
    </Svg>
  );
}

export function MaterialSymbolsSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        fill="#000"
        d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"></Path>
    </Svg>
  );
}

export function Rightarrow(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24">
      <Path
        fill="black"
        d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"
      />
    </Svg>
  );
}
export function Homeicon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24">
      <Path
        fill="black"
        d="m21.743 12.331l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669"
      />
    </Svg>
  );
}
export function Services(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 16 16">
      <Path
        fill="black"
        fill-rule="evenodd"
        d="M9.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M3 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M9.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m5 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M13 4.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M4.5 3a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M8 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m6.5-1.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M3 14.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
        clip-rule="evenodd"
      />
    </Svg>
  );
}
export function History_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
    <Path fill="black" d="M21 11.11V5a2 2 0 0 0-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h6.11c1.26 1.24 2.98 2 4.89 2c3.87 0 7-3.13 7-7c0-1.91-.76-3.63-2-4.89M12 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1M6 7h12v2H6zm3.08 10H6v-2h3.08c-.05.33-.08.66-.08 1s.03.67.08 1M6 13v-2h5.11c-.61.57-1.07 1.25-1.43 2zm10 8c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m.5-4.75l2.86 1.69l-.75 1.22L15 17v-5h1.5z" />
  </Svg>
  );
}

export function Activityicon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24">
      <Path
        fill="black"
        d="M17 2a3 3 0 0 1 3 3v16a1 1 0 0 1-1.555.832l-2.318-1.545l-1.42 1.42a1 1 0 0 1-1.32.083l-.094-.083L12 20.415l-1.293 1.292a1 1 0 0 1-1.32.083l-.094-.083l-1.421-1.42l-2.317 1.545l-.019.012l-.054.03l-.028.017l-.054.023l-.05.023l-.049.015l-.06.019l-.052.009l-.057.011l-.084.006l-.026.003H5l-.049-.003h-.039l-.013-.003h-.016l-.041-.008l-.038-.005l-.015-.005l-.018-.002l-.034-.011l-.04-.01l-.019-.007l-.015-.004l-.029-.013l-.04-.015l-.021-.011l-.013-.005l-.028-.016l-.036-.018l-.014-.01l-.018-.01l-.038-.027l-.022-.014l-.01-.009l-.02-.014l-.045-.041l-.012-.008l-.024-.024l-.035-.039l-.02-.02l-.007-.011l-.011-.012l-.032-.045l-.02-.025l-.012-.019l-.03-.054l-.017-.028l-.023-.054l-.023-.05a1 1 0 0 1-.034-.108l-.01-.057l-.01-.053L4 21V5a3 3 0 0 1 3-3zm-2 12h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2m0-4H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m0-4H9a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2"
      />
    </Svg>
  );
}

export function Accounticon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24">
      <Path
        fill="black"
        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
      />
    </Svg>
  );
}

export function Phonecall(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24">
      <Path
        fill="black"
        d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
      />
    </Svg>
  );
}

export function Phonecall_white(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24">
      <Path
        fill="white"
        d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
      />
    </Svg>
  );
}

export function Phonecall2(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="white"
        d="M21.33 19.035a2.57 2.57 0 0 1-.884 1.432a5.251 5.251 0 0 1-3.738 1.564h-.325a10.973 10.973 0 0 1-4.205-1.087h-.01c-.305-.142-.62-.284-.925-.457a19.127 19.127 0 0 1-4.185-3.18a18.193 18.193 0 0 1-3.9-5.292A11.692 11.692 0 0 1 2.14 8.572a6.38 6.38 0 0 1 .407-3.708a6.827 6.827 0 0 1 1.148-1.432A2.194 2.194 0 0 1 5.29 2.69a2.51 2.51 0 0 1 1.687.935c.457.497 1.015 1.015 1.473 1.493l.63.62c.37.328.599.786.64 1.28c0 .453-.167.89-.468 1.229a9.141 9.141 0 0 1-.62.68l-.203.213c-.118.11-.208.246-.264.397c-.05.147-.07.302-.06.457c.161.431.414.823.74 1.148c.509.69 1.017 1.29 1.535 1.94a12.9 12.9 0 0 0 3.29 2.733c.127.093.273.155.428.182c.134.01.27-.01.396-.06c.355-.209.67-.477.934-.793a2.174 2.174 0 0 1 1.422-.782a2.032 2.032 0 0 1 1.423.61c.203.172.426.406.64.63l.304.314l.315.305l.539.548c.321.285.623.59.904.915c.282.39.409.872.355 1.35m-3.646-6.958a.772.772 0 0 1-.762-.762a4.37 4.37 0 0 0-4.378-4.378a.762.762 0 0 1 0-1.524a5.893 5.893 0 0 1 5.902 5.902a.762.762 0 0 1-.762.762"
      />
      <Path
        fill="white"
        d="M21.209 11.72a.772.772 0 0 1-.762-.761a7.455 7.455 0 0 0-7.456-7.467a.762.762 0 1 1 0-1.523a8.98 8.98 0 0 1 8.98 8.99a.762.762 0 0 1-.762.762"
      />
    </Svg>
  );
}

export function Back_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 1024 1024">
      <Path
        fill="black"
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
      />
      <Path
        fill="black"
        d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
      />
    </Svg>
  );
}

export function Three_dot_menu(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 20 20">
      <Path
        fill="black"
        fill-rule="evenodd"
        d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
        clip-rule="evenodd"
      />
    </Svg>
  );
}

export function Add_button(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 20 20">
      <Path
        fill="black"
        d="M11 9V5H9v4H5v2h4v4h2v-4h4V9zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20"
      />
    </Svg>
  );
}

export function Filter_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke="black"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
        d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"
      />
    </Svg>
  );
}

export function Star_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="#fcd53f"
        d="M17.562 21.56a1 1 0 0 1-.465-.115L12 18.765l-5.097 2.68a1 1 0 0 1-1.451-1.054l.973-5.676l-4.123-4.02a1 1 0 0 1 .554-1.705l5.699-.828l2.548-5.164a1.042 1.042 0 0 1 1.794 0l2.548 5.164l5.699.828a1 1 0 0 1 .554 1.706l-4.123 4.019l.973 5.676a1 1 0 0 1-.986 1.169"
      />
    </Svg>
  );
}

export function Verify_Tick(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="25"
      height="25"
      viewBox="0 0 48 48">
      <Polygon
        fill="#42a5f5"
        points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></Polygon>
      <Polygon
        fill="#fff"
        points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></Polygon>
    </Svg>
  );
}

export function Location_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="#000"
        fill-rule="evenodd"
        d="M8.25 9a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0M12 6.75a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5"
        clip-rule="evenodd"
      />
      <Path
        fill="#000"
        fill-rule="evenodd"
        d="M5.456 8.127a6.403 6.403 0 0 1 6.382-5.877h.324a6.403 6.403 0 0 1 6.382 5.877a6.9 6.9 0 0 1-1.534 4.931l-3.595 4.397a1.828 1.828 0 0 1-2.83 0L6.99 13.058a6.9 6.9 0 0 1-1.534-4.93m6.382-4.377a4.903 4.903 0 0 0-4.887 4.5a5.4 5.4 0 0 0 1.2 3.859l3.595 4.396c.131.16.377.16.508 0l3.595-4.396a5.4 5.4 0 0 0 1.2-3.859a4.903 4.903 0 0 0-4.887-4.5z"
        clip-rule="evenodd"
      />
      <Path
        fill="#000"
        d="M7.67 16.335a.75.75 0 1 0-1.34-.67l-2 4A.75.75 0 0 0 5 20.75h14a.75.75 0 0 0 .67-1.085l-2-4a.75.75 0 1 0-1.34.67l1.457 2.915H6.214z"
      />
    </Svg>
  );
}

export function Message_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 20 20">
      <Path
        fill="#000"
        d="M10 0c5.342 0 10 4.41 10 9.5c0 5.004-4.553 8.942-10 8.942a11 11 0 0 1-3.43-.546c-.464.45-.623.603-1.608 1.553c-.71.536-1.378.718-1.975.38c-.602-.34-.783-1.002-.66-1.874l.4-2.319C.99 14.002 0 11.842 0 9.5C0 4.41 4.657 0 10 0m0 1.4c-4.586 0-8.6 3.8-8.6 8.1c0 2.045.912 3.928 2.52 5.33l.02.017l.297.258l-.067.39l-.138.804l-.037.214l-.285 1.658a3 3 0 0 0-.03.337v.095q0 .007-.002.008c.007-.01.143-.053.376-.223l2.17-2.106l.414.156a9.6 9.6 0 0 0 3.362.605c4.716 0 8.6-3.36 8.6-7.543c0-4.299-4.014-8.1-8.6-8.1M5.227 7.813a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.998 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998m4.997 0a1.5 1.5 0 1 1 0 2.998a1.5 1.5 0 0 1 0-2.998"
      />
    </Svg>
  );
}

export function Direction_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 100 100">
      <Path
        fill="#858585"
        fill-rule="evenodd"
        d="m50 0l-1.455 2.518l-14.063 24.328h7.114v22.63a75.4 75.4 0 0 1 8.4 11.337a77 77 0 0 1 8.408-11.329V26.846h7.114zM30.89 34.348L0 37.057l1.666 2.382l16.098 23.034l2.51-5.377c7.137 5.62 17.034 16.617 19.283 35.492c.441-4.589 1.239-9.144 2.505-13.58c1.368-4.927 3.288-9.679 5.665-14.192C41.472 53.731 33.27 46.26 27.373 41.885zm38.22 0l3.517 7.537c-10.755 7.975-29.184 26.22-29.459 57.969l16.805.146c.203-23.476 11.728-36.585 19.754-42.904l2.51 5.377L100 37.057l-2.896-.254z"
        color="#000"
      />
    </Svg>
  );
}



export function Information_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="#858585"
        d="M12.3 7.29c.2-.18.44-.29.7-.29c.27 0 .5.11.71.29c.19.21.29.45.29.71c0 .27-.1.5-.29.71c-.21.19-.44.29-.71.29c-.26 0-.5-.1-.7-.29c-.19-.21-.3-.44-.3-.71c0-.26.11-.5.3-.71m-2.5 4.68s2.17-1.72 2.96-1.79c.74-.06.59.79.52 1.23l-.01.06c-.14.53-.31 1.17-.48 1.78c-.38 1.39-.75 2.75-.66 3c.1.34.72-.09 1.17-.39c.06-.04.11-.08.16-.11c0 0 .08-.08.16.03c.02.03.04.06.06.08c.09.14.14.19.02.27l-.04.02c-.22.15-1.16.81-1.54 1.05c-.41.27-1.98 1.17-1.74-.58c.21-1.23.49-2.29.71-3.12c.41-1.5.59-2.18-.33-1.59c-.37.22-.59.36-.72.45c-.11.08-.12.08-.19-.05l-.03-.06l-.05-.08c-.07-.1-.07-.11.03-.2M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8"
      />
    </Svg>
  );
}

export function Phonecall_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="green"
        d="M21.33 19.035a2.57 2.57 0 0 1-.884 1.432a5.25 5.25 0 0 1-3.738 1.564h-.325a11 11 0 0 1-4.205-1.087h-.01c-.305-.142-.62-.284-.925-.457a19 19 0 0 1-4.185-3.18a18.2 18.2 0 0 1-3.9-5.292A11.7 11.7 0 0 1 2.14 8.572a6.4 6.4 0 0 1 .407-3.708a6.8 6.8 0 0 1 1.148-1.432A2.2 2.2 0 0 1 5.29 2.69a2.5 2.5 0 0 1 1.687.935c.457.497 1.015 1.015 1.473 1.493l.63.62c.37.328.599.786.64 1.28c0 .453-.167.89-.468 1.229a9 9 0 0 1-.62.68l-.203.213c-.118.11-.208.246-.264.397q-.075.223-.06.457c.161.431.414.823.74 1.148c.509.69 1.017 1.29 1.535 1.94a12.9 12.9 0 0 0 3.29 2.733c.127.093.273.155.428.182c.134.01.27-.01.396-.06c.355-.209.67-.477.934-.793a2.17 2.17 0 0 1 1.422-.782a2.03 2.03 0 0 1 1.423.61c.203.172.426.406.64.63l.304.314l.315.305l.539.548q.482.428.904.915c.282.39.409.872.355 1.35m-3.646-6.958a.77.77 0 0 1-.762-.762a4.37 4.37 0 0 0-4.378-4.378a.762.762 0 0 1 0-1.524a5.893 5.893 0 0 1 5.902 5.902a.76.76 0 0 1-.762.762"
      />
      <Path
        fill="green"
        d="M21.209 11.72a.77.77 0 0 1-.762-.761a7.455 7.455 0 0 0-7.456-7.467a.762.762 0 1 1 0-1.523a8.98 8.98 0 0 1 8.98 8.99a.76.76 0 0 1-.762.762"
      />
    </Svg>
  );
}

export function Location_icon1(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 20 20">
      <Path
        fill="#858585"
        d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13m0-11a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </Svg>
  );
}

export function Phonecall_light(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24">
      <Path
        fill="white"
        d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
      />
    </Svg>
  );
}

export function Settings_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 1024 1024">
      <Path
        fill="black"
        d="M512.5 390.6c-29.9 0-57.9 11.6-79.1 32.8c-21.1 21.2-32.8 49.2-32.8 79.1s11.7 57.9 32.8 79.1c21.2 21.1 49.2 32.8 79.1 32.8s57.9-11.7 79.1-32.8c21.1-21.2 32.8-49.2 32.8-79.1s-11.7-57.9-32.8-79.1a110.96 110.96 0 0 0-79.1-32.8m412.3 235.5l-65.4-55.9c3.1-19 4.7-38.4 4.7-57.7s-1.6-38.8-4.7-57.7l65.4-55.9a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a442.5 442.5 0 0 0-79.6-137.7l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.2 28.9c-30-24.6-63.4-44-99.6-57.5l-15.7-84.9a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52-9.4-106.8-9.4-158.8 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.3a353.4 353.4 0 0 0-98.9 57.3l-81.8-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a445.9 445.9 0 0 0-79.6 137.7l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.2 56.5c-3.1 18.8-4.6 38-4.6 57c0 19.2 1.5 38.4 4.6 57l-66 56.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.3 44.8 96.8 79.6 137.7l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.8-29.1c29.8 24.5 63 43.9 98.9 57.3l15.8 85.3a32.05 32.05 0 0 0 25.8 25.7l2.7.5a448.3 448.3 0 0 0 158.8 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-84.9c36.2-13.6 69.6-32.9 99.6-57.5l81.2 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.5-87.4 79.6-137.7l.9-2.6c4.3-12.4.6-26.3-9.5-35m-412.3 52.2c-97.1 0-175.8-78.7-175.8-175.8s78.7-175.8 175.8-175.8s175.8 78.7 175.8 175.8s-78.7 175.8-175.8 175.8"
      />
    </Svg>
  );
}

export function Question_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="black"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-7v2h2v-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.5 3.5 0 0 0-3.433 2.813l1.962.393A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2z"
      />
    </Svg>
  );
}

export function Information_icon_dark(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 32 32">
      <Path
        fill="none"
        d="M16 8a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 13.875h-2.875v-8H13v2.25h1.875v5.75H12v2.25h8Z"
      />
      <Path
        fill="black"
        d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 6a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 16.125h-8v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z"
      />
    </Svg>
  );
}

export function Pencil_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="black"
        d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
      />
    </Svg>
  );
}

export function Pointer_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <Path
        fill="#005ca2"
        d="m13.761 12.01l-10.76-1.084L3 4.074a1.074 1.074 0 0 1 1.554-.96l15.852 7.926a1.074 1.074 0 0 1 0 1.92l-15.85 7.926a1.074 1.074 0 0 1-1.554-.96v-6.852z"
      />
    </Svg>
  );
}

export function Box_tick(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24">
      <G
        fill="none"
        stroke="#005ca2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2">
        <Path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" />
        <Path d="m9 11l3 3L22 4" />
      </G>
    </Svg>
  );
}

export function Send_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
  xmlns="http://www.w3.org/2000/svg"
  width="45"
  height="45"
  viewBox="0 0 24 24">
  <Path
    fill="#000"
    d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2M8 7.71v3.34l7.14.95l-7.14.95v3.34L18 12z"
  />
</Svg>
  );
}
export function Addfile_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 20 20">
    <Path fill="#000" d="M11 9V5H9v4H5v2h4v4h2v-4h4V9zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20" />
  </Svg>
  );
}
export function Circle_Phone_icon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 1200 1200">
	<Path fill="#000" d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0M384.375 238.33c12.362-.729 23.536 6.66 32.007 19.775l82.031 155.566c8.637 18.434 3.729 38.172-9.155 51.343l-37.573 37.573c-2.319 3.178-3.845 6.757-3.882 10.693c14.409 55.775 58.117 107.223 96.681 142.603c38.562 35.38 80.009 83.281 133.812 94.629c6.65 1.855 14.797 2.52 19.556-1.903l43.652-44.458c15.068-11.421 36.866-16.956 52.954-7.617h.732l148.021 87.378c21.728 13.619 23.979 39.944 8.423 55.957L849.683 941.016c-15.056 15.44-35.058 20.631-54.491 20.654c-85.948-2.575-167.158-44.759-233.862-88.11c-109.49-79.653-209.923-178.446-272.975-297.803c-24.182-50.05-52.589-113.91-49.878-169.774c.242-21.016 5.928-41.605 20.728-55.151l101.953-101.953c7.942-6.758 15.799-10.111 23.217-10.549" />
</Svg>
  );
}

export function Phonecall_end(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="45"
      viewBox="0 0 24 24">
      <Path
        fill="white"
        d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
      />
    </Svg>
  );
}

export function Speaker_on(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 48 48">
    <Path fill="#fff" d="M25.081 6.419C26.208 5.408 28 6.207 28 7.72v32.56c0 1.514-1.792 2.313-2.919 1.302l-8.206-7.366A4.75 4.75 0 0 0 13.702 33H9a5.25 5.25 0 0 1-5.25-5.25v-7.5C3.75 17.35 6.1 15 9 15h4.702a4.75 4.75 0 0 0 3.173-1.216zm7.253 7.98a1.25 1.25 0 0 1 1.767-.064l.064.061l-.064-.06h.001l.002.002l.005.005l.014.012l.042.041q.051.05.137.139c.113.118.269.287.452.505c.366.436.847 1.072 1.326 1.893A14 14 0 0 1 38 24c0 3.023-.963 5.426-1.92 7.068c-.48.82-.96 1.457-1.326 1.893a10 10 0 0 1-.59.644l-.019.019l-.022.021l-.014.013l-.005.005l-.003.003l.008-.008l-.008.008a1.25 1.25 0 0 1-1.705-1.828l.002-.002l.016-.016l.085-.086a8 8 0 0 0 .34-.381c.29-.346.685-.866 1.081-1.545A11.5 11.5 0 0 0 35.5 24c0-2.477-.787-4.449-1.58-5.807c-.396-.68-.79-1.2-1.08-1.545a8 8 0 0 0-.426-.467l-.017-.017l.001.001a1.25 1.25 0 0 1-.064-1.765" />
  </Svg>
  );
}
export function Mic_on(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
	<G fill="none">
		<Path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
		<Path fill="#fff" d="M4.93 12.01a1 1 0 0 1 1.13.848a6 6 0 0 0 7.832 4.838l.293-.107l1.509 1.509a8 8 0 0 1-2.336.787l-.358.053V21a1 1 0 0 1-1.993.117L11 21v-1.062a8.005 8.005 0 0 1-6.919-6.796a1 1 0 0 1 .848-1.132ZM12 2a5 5 0 0 1 4.995 4.783L17 7v5a5 5 0 0 1-.691 2.538l-.137.22l.719.719c.542-.76.91-1.652 1.048-2.619a1 1 0 0 1 1.98.284a7.96 7.96 0 0 1-1.412 3.513l-.187.25l2.165 2.166a1 1 0 0 1-1.32 1.497l-.094-.083L3.515 4.93a1 1 0 0 1 1.32-1.497l.094.083l2.23 2.23A5 5 0 0 1 12 2m-5 8.404l6.398 6.398A5 5 0 0 1 7 12z" />
	</G>
</Svg>
  );
}

export function Reject_call(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 32 32">
	<Path fill="#fff" d="m26.74 19.56l-2.52-1a2 2 0 0 0-2.15.44L20 21.06a9.93 9.93 0 0 1-5.35-2.29L30 3.41L28.59 2L2 28.59L3.41 30l7.93-7.92c3.24 3.12 7.89 5.5 14.55 5.92A2 2 0 0 0 28 26v-4.59a2 2 0 0 0-1.26-1.85M8.15 18.19l3.52-3.52a11.7 11.7 0 0 1-.82-2.67l2.07-2.07a2 2 0 0 0 .44-2.15l-1-2.52A2 2 0 0 0 10.5 4H6a2 2 0 0 0-2 2.22a29 29 0 0 0 4.15 11.97" />
</Svg>
  );
}


const WaveLoader = ({
  size = 100,
  darkColor = '#000000',
  lightColor = '#333333',
}) => {
  const scaleAnimDark = useRef(new Animated.Value(1)).current;
  const scaleAnimLight = useRef(new Animated.Value(1.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnimDark, {
            toValue: 1.5,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimLight, {
            toValue: 2,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnimDark, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnimLight, {
            toValue: 1.5,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [scaleAnimDark, scaleAnimLight]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            backgroundColor: darkColor,
            transform: [{scale: scaleAnimDark}],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            width: size * 1.5,
            height: size * 1.5,
            backgroundColor: lightColor,
            transform: [{scale: scaleAnimLight}],
            position: 'absolute',
            top: -(size * 0.25),
            left: -(size * 0.25),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 50,
  },
});

export default WaveLoader;
