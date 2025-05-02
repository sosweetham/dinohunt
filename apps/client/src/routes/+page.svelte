<style lang="postcss">
.text-stroke {
    text-shadow:
        -1px -1px 0 var(--highlight),
        1px -1px 0 var(--highlight),
        -1px 1px 0 var(--highlight),
        1px 1px 0 var(--highlight);
}

#content-container {
    position: absolute;
    height: 25vh;
    min-height: 200px;
    bottom: 0px;
    width: 100%;
}
#stripe-bound {
    width: 100vw;
}
#stripe-container {
    position: absolute;
    left: 50%;
    bottom: 0px;
    translate: -50% 0%;
    height: 28vh;
    min-height: 240px;
    width: 100%;
    min-width: 2000px;
    clip-path: polygon(
        0% 5%,
        1.25% 0%,
        2.5% 5%,
        3.75% 0%,
        5% 5%,
        6.25% 0%,
        7.5% 5%,
        8.75% 0%,
        10% 5%,
        11.25% 0%,
        12.5% 5%,
        13.75% 0%,
        15% 5%,
        16.25% 0%,
        17.5% 5%,
        18.75% 0%,
        20% 5%,
        21.25% 0%,
        22.5% 5%,
        23.75% 0%,
        25% 5%,
        26.25% 0%,
        27.5% 5%,
        28.75% 0%,
        30% 5%,
        31.25% 0%,
        32.5% 5%,
        33.75% 0%,
        35% 5%,
        36.25% 0%,
        37.5% 5%,
        38.75% 0%,
        40% 5%,
        41.25% 0%,
        42.5% 5%,
        43.75% 0%,
        45% 5%,
        46.25% 0%,
        47.5% 5%,
        48.75% 0%,
        50% 5%,
        51.25% 0%,
        52.5% 5%,
        53.75% 0%,
        55% 5%,
        56.25% 0%,
        57.5% 5%,
        58.75% 0%,
        60% 5%,
        61.25% 0%,
        62.5% 5%,
        63.75% 0%,
        65% 5%,
        66.25% 0%,
        67.5% 5%,
        68.75% 0%,
        70% 5%,
        71.25% 0%,
        72.5% 5%,
        73.75% 0%,
        75% 5%,
        76.25% 0%,
        77.5% 5%,
        78.75% 0%,
        80% 5%,
        81.25% 0%,
        82.5% 5%,
        83.75% 0%,
        85% 5%,
        86.25% 0%,
        87.5% 5%,
        88.75% 0%,
        90% 5%,
        91.25% 0%,
        92.5% 5%,
        93.75% 0%,
        95% 5%,
        96.25% 0%,
        97.5% 5%,
        98.75% 0%,
        100% 5%,
        100% 100%,
        0% 100%
    );
}
</style>

<script lang="ts">
// import { Button } from "$lib/components/ui/button";
import { onMount } from "svelte";
import { fade } from "svelte/transition";

let ready = false;
onMount(() => {
    ready = true;
});
</script>

<div class="relative h-screen w-screen overflow-x-hidden overflow-y-scroll">
    {#if ready}
        <div
            class="h-[75vh] w-screen -scale-x-100 bg-[url('/images/jungle-pexels-davidriano-975771.jpg')] bg-cover bg-no-repeat">
            <div
                in:fade={{ delay: 700 }}
                class="h-[75vh] w-full -scale-x-100 bg-[url('/images/dinosaur-purepng.png')] bg-contain bg-right-bottom bg-no-repeat md:translate-x-36 md:translate-y-10">
            </div>
        </div>
        <div
            in:fade={{ delay: 300 }}
            id="content-container"
            class="flex h-full w-full flex-col items-center justify-center gap-4 font-black text-white md:flex-row lg:ml-4 lg:justify-between lg:pr-8">
            <div class="absolute bottom-0 w-screen">
                <div id="stripe-bound">
                    <div id="stripe-container">
                        <div
                            class="h-full w-full animate-[pan_360s_linear_infinite] bg-[linear-gradient(-45deg,rgb(var(--neutral-100-rgb))_25%,rgb(var(--neutral-200-rgb))_25%,rgb(var(--neutral-200-rgb))_50%,rgb(var(--neutral-100-rgb))_50%,rgb(var(--neutral-100-rgb))_75%,rgb(var(--neutral-200-rgb))_75%,rgb(var(--neutral-200-rgb))_100%)] bg-[length:18px_18px] shadow-[inset_0rem_0.5rem_2rem_0.25rem_rgba(0,0,0,0.4)] dark:bg-[linear-gradient(-45deg,rgb(var(--neutral-800-rgb))_25%,rgb(var(--neutral-900-rgb))_25%,rgb(var(--neutral-900-rgb))_50%,rgb(var(--neutral-800-rgb))_50%,rgb(var(--neutral-800-rgb))_75%,rgb(var(--neutral-900-rgb))_75%,rgb(var(--neutral-900-rgb))_100%)]">
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="text-stroke text-center font-rubik-dirt text-3xl font-normal mix-blend-multiply dark:text-neutral-950 dark:mix-blend-plus-lighter md:text-6xl lg:text-8xl">
                dinohunt
                <span class="block text-xl md:inline md:text-2xl lg:text-3xl">
                    (coming soon)
                </span>
            </div>
        </div>
    {/if}
</div>
