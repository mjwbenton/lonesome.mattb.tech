---
title: "Keyboards: First Build"
group: Keyboards
index: 2
---

## Keyboards: First Build

![Final Product](https://c2.staticflickr.com/2/1907/30774413087_6a1a8ca1ec_c.jpg)

I decided to build my own keyboard, almost entirely inspired by posts seen on [Reddit's r/mk community](https://www.reddit.com/r/mechanicalkeyboards).

Photos all on Flickr in [this set](https://www.flickr.com/photos/z-two/albums/72157697316445120).

### Parts List

[KBDfans](https://kbdfans.cn) provided all of the parts. I've ordered from them from both the US and UK and, while it takes a little while, the stuff they have available is excellent, and generally it's actually in stock that they can ship rather than being part of a [group buy](https://en.wikipedia.org/wiki/Group_buying).

- Keycaps: [DSA Lazer Etched PBT Keycaps in Blue/Yellow](https://kbdfans.cn/products/dsa-pbt-145keys-keycaps-laser-etched-front-printed-legends?variant=40419237389). Had these on a different keyboard for quite a while now, but whilst I wait for some fancier keycaps to be delivered these ones are great.
- Case: [KBDfans 5° 60% keyboard aluminum case](https://kbdfans.cn/products/pre-orderkbdfans-5-60-case?variant=43337028493)
- PCB: [DZ60 Rev 2.0 60% Mechanical Keyboard PCB](https://kbdfans.cn/products/dz60-60-pcb?variant=13001004679226). This included the switches and stabilizers.
- Switches: [Kailh Box Royals](https://kbdfans.cn/collections/kailh-switches/products/kailh-box-royal-switches-10-pcs). I likely have the old version, whereas this link is for the new one.
- Stabilizers: [PCB stabilizers black color](https://kbdfans.cn/products/pcb-stabilizers-black-color)

### The Process

I've got a bag of switches, a PCB and a borrowed soldering iron. What more could I need? I'd already used a pair of ordinary tweezers to test each key against [KeyboardTester.com](http://www.keyboardtester.com/).

![Getting started](https://c2.staticflickr.com/2/1935/31842940788_1f6e6db50b_c.jpg)

J tests the first switch we soldered successfully. We confirm that with a real switch in place, the "Esc" key works as advertised.

![First key](https://c2.staticflickr.com/2/1906/44990089754_780e2885aa_c.jpg)

We continue soldering switches, though we quickly become aware that we don't have any good technique to keep them straight. Due to this, we start to solder just one leg to try and get everything on, but still give us the capability to rotate things a little later before we do the second leg. Some switches are already completely soldered though, and they're certainly not completely straight.

![Me soldering](https://c1.staticflickr.com/5/4882/31842944328_0e418b6393_c.jpg)

![J soldering](https://c2.staticflickr.com/2/1941/44990092764_7a4abf50be_c.jpg)

Ashlyn helped with the best technique we found to readjust the keys; trying to get the keys to sit flush against a metal ruler by applying pressure and resoldering the first joint before soldering the second.

![Ashlyn helping with key readjustment](https://c2.staticflickr.com/2/1912/44990098294_f9ff5e237f_c.jpg)

Eventually they're all soldered.

![All soldered](https://c2.staticflickr.com/2/1945/45664073472_6eb2606c40_c.jpg)

Not all the keycaps are in the right place, but all the switches are in and work.

![Testing](https://c1.staticflickr.com/5/4917/44990096954_a0ef180da3_c.jpg)

And once I'd put it in a case, we get our first look at a finished product (bar reprogramming the firmware). Still some wonky keys, especially the "H" right in the middle, but overall I'm really happy with the appearance.

![Wonky keys](https://c2.staticflickr.com/2/1954/45664098542_457bc38e90_c.jpg)

What I'm not happy with however is the sound of the stabilized keys. I'm not super bothered about how they feel, but they sound _horrible_, rattly and scratchy. To fix this I turn to [topclack.com's "The Stab Lab: A living stabilizer modification guide](https://topclack.com/textclack/2018/4/29/the-stab-lab-a-stabilizer-modification-guide-by-quakemz). The stabilizers I have don't require "clipping", but I decided to try my hand at "lubing" and "band-aid modification". That required buying some lubricant, I went with [Silverhook SGPGT90 Silicone Grease](https://www.amazon.co.uk/gp/product/B00W6Q3B1G/).

![Lubricant for the stabilizers](https://c2.staticflickr.com/2/1932/45664095472_00bc69e170_c.jpg)

I applied the lubricant with a small brush that Ashlyn had lying around.

![Applying the lubricant](https://c1.staticflickr.com/5/4832/30774426197_772fa8b6ab_c.jpg)

Here's my poor attempt at the band-aid mod. Looking at it afterwards I think I should have cut the pieces a little bit bigger. I have absolutely no idea how much difference they're making.

![Poor attempt at the Band Aid Mod](https://c1.staticflickr.com/5/4819/45714755031_8c864d685c_c.jpg)

![Poor attempt at the Band Aid Mod Part 2](https://c2.staticflickr.com/2/1934/30774428447_00fb29565d_c.jpg)

With those modifications a huge difference was made. I can barely tell any difference at all sound wise between the stabilized keys and the non-stabilized keys!

Here's another shot of the final product.

![Final Product](https://c2.staticflickr.com/2/1907/30774413087_6a1a8ca1ec_c.jpg)

### Flashing the firmware

The keyboard uses the open source [QMK firmware](https://qmk.fm/).

To create my own custom layout I forked the QMK github repo, and added my own layout to the DZ60 keymaps directory.

[Link to my fork](https://github.com/mjwbenton/qmk_firmware/tree/mjwbenton), [Link to the commit where I added my custom layout](https://github.com/mjwbenton/qmk_firmware/commit/6f01195f35fc0e8d295ca9697e970e3be398e5ba).

There's nothing too interesting about my keymap, but it does show how you can get exactly what you're after if you are able to use QMK. I've been using software to make "some modifier + arrow key" be home/end/page up/page down for years, now I can add it directly to the keyboard firmware!

Once you've got a custom keymap, the process to flash the firmware to the keyboard is pretty simple. Start by making sure you've got the prerequisites installed to be able to build the firmware. In the directory where you have qmk_firmware checked out:

```
$> ./util/qmk_install.sh
$> export PATH="/usr/local/opt/avr-gcc@7/bin:$PATH"
$> make dz60:mjwbenton
```

That will build the firmware with the custom keymap. If it's successful then you're ready to actually do the flashing.

Plug the keyboard in whilst holding down "Space+b", then flash the firmware with:

```
$> make dz60:mjwbenton:dfu
```
