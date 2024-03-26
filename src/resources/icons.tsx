import React from "react";
export type IconNames = "btc" | "eth" | "usdt";

export const icons: Record<IconNames, React.ReactNode> = {
  btc: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g strokeWidth="0" />
      <g strokeLinecap="round" strokeLinejoin="round" />
      <g stroke="#000">
        <path d="M20.247 14.052a8.5 8.5 0 0 1-10.302 6.194C5.394 19.11 2.62 14.5 3.754 9.95s5.74-7.33 10.288-6.195c4.562 1.12 7.337 5.744 6.205 10.298Z" />
        <path
          d="m9.4 14.912 1.693-6.792m-1.456-.363L13.818 8.8c2.728.68 2.12 3.877-.786 3.153 3.184.794 2.86 4.578-.907 3.639-1.841-.46-3.813-.95-3.813-.95m1.994-3.368 2.669.665m-1.397-3.698.363-1.455m-2.42 9.703.363-1.456m3.634-6.308.363-1.455m-2.419 9.703.363-1.456"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  ),
  eth: (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g stroke-width="0" />
      <g stroke-linecap="round" stroke-linejoin="round" />
      <g fill="none" fill-rule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#627EEA" />
        <g fill="#FFF" fill-rule="nonzero">
          <path fill-opacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
          <path d="M16.498 4 9 16.22l7.498-3.35z" />
          <path fill-opacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
          <path d="M16.498 27.995v-6.028L9 17.616z" />
          <path fill-opacity=".2" d="m16.498 20.573 7.497-4.353-7.497-3.348z" />
          <path fill-opacity=".602" d="m9 16.22 7.498 4.353v-7.701z" />
        </g>
      </g>
    </svg>
  ),
  usdt: (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g stroke-width="0" />
      <g stroke-linecap="round" stroke-linejoin="round" />
      <g fill="none" fill-rule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#26A17B" />
        <path
          fill="#FFF"
          d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658s2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118s3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116s-3.301-1.914-7.694-2.117"
        />
      </g>
    </svg>
  ),
};

export default icons;
