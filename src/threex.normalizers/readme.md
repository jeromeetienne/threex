threex.normalizers
==================

* extension to normalize values

## what is a normalizer ?
* it outputs number between [0, 1] included
* it receives a series of number which is normalized
* the algo used for normalization may varies
  * use the one fitting your needs

## absolute normalizer
* it maintains the minimum and the maximum values of all the values ever received
* the convertion take the input value and makes a linear interpolation between min and max
* so the output is always between 0 and 1

## adapatative normalizer
* it is the same as the absolute normalizer
* but the min and max moving slowly

# TODO
* adaptative is buggy, it never shrinks.
