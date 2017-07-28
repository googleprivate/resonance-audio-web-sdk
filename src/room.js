/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file Pre-defined wall materials and mathematical constants.
 * @author Andrew Allen <bitllama@google.com>
 */

'use strict';

// Internal dependencies.
var Globals = require('./globals.js');
var Utils = require('./utils.js');

/**
 * @class Room
 */
var Room = {};

// Reverb/reflections constants.
Room.MinVolume = 1e-4;
Room.AirAbsorbtionCoefficients =
  [0.0006, 0.0006, 0.0007, 0.0008, 0.0010, 0.0015, 0.0026, 0.0060, 0.0207];

/** Wall types are 'left', 'right', 'front', 'back', 'ceiling', and 'floor'. */
Room.WallTypes = ['left', 'right', 'front', 'back', 'ceiling', 'floor'];
Room.NumWalls = Room.WallTypes.length;

Room.DimensionTypes = ['width', 'height', 'depth'];
Room.NumDimensions = Room.DimensionTypes.length;

/**
 * Default dimensions use scalars assigned to
 * keys 'width', 'height', and 'depth'.
 * @type {Map}
 */
Room.DefaultDimensions = {'width' : 0, 'height' : 0, 'depth' : 0};
/**
 * Default materials use strings from
 * {@link Room.MaterialCoefficients Room.MaterialCoefficients}
 * assigned to keys 'left', 'right', 'front', 'back', 'floor', and 'ceiling'.
 * @type {Map}
 */
Room.DefaultMaterials = { 'left' : 'Transparent', 'right' : 'Transparent',
  'front' : 'Transparent', 'back' : 'Transparent', 'floor' : 'Transparent',
  'ceiling' : 'Transparent'}

/**
 * Pre-defined frequency-dependent absorption coefficients for listed materials.
 * Currently supported materials are:
 * 'Transparent',
 * 'AcousticCeilingTiles',
 * 'BrickBare',
 * 'BrickPainted',
 * 'ConcreteBlockCoarse',
 * 'ConcreteBlockPainted',
 * 'CurtainHeavy',
 * 'FiberGlassInsulation',
 * 'GlassThin',
 * 'GlassThick',
 * 'Grass',
 * 'LinoleumOnConcrete',
 * 'Marble',
 * 'Metal',
 * 'ParquetOnConcrete',
 * 'PlasterSmooth',
 * 'PlywoodPanel',
 * 'PolishedConcreteOrTile',
 * 'Sheetrock',
 * 'WaterOrIceSurface',
 * 'WoodCeiling',
 * 'WoodPanel',
 * 'Uniform'
 * @type {Map}
 */
Room.MaterialCoefficients = {
  'Transparent' :
  [1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000, 1.000],
  'AcousticCeilingTiles' :
  [0.672, 0.675, 0.700, 0.660, 0.720, 0.920, 0.880, 0.750, 1.000],
  'BrickBare' :
  [0.030, 0.030, 0.030, 0.030, 0.030, 0.040, 0.050, 0.070, 0.140],
  'BrickPainted' :
  [0.006, 0.007, 0.010, 0.010, 0.020, 0.020, 0.020, 0.030, 0.060],
  'ConcreteBlockCoarse' :
  [0.360, 0.360, 0.360, 0.440, 0.310, 0.290, 0.390, 0.250, 0.500],
  'ConcreteBlockPainted' :
  [0.092, 0.090, 0.100, 0.050, 0.060, 0.070, 0.090, 0.080, 0.160],
  'CurtainHeavy' :
  [0.073, 0.106, 0.140, 0.350, 0.550, 0.720, 0.700, 0.650, 1.000],
  'FiberGlassInsulation' :
  [0.193, 0.220, 0.220, 0.820, 0.990, 0.990, 0.990, 0.990, 1.000],
  'GlassThin' :
  [0.180, 0.169, 0.180, 0.060, 0.040, 0.030, 0.020, 0.020, 0.040],
  'GlassThick' :
  [0.350, 0.350, 0.350, 0.250, 0.180, 0.120, 0.070, 0.040, 0.080],
  'Grass' :
  [0.050, 0.050, 0.150, 0.250, 0.400, 0.550, 0.600, 0.600, 0.600],
  'LinoleumOnConcrete' :
  [0.020, 0.020, 0.020, 0.030, 0.030, 0.030, 0.030, 0.020, 0.040],
  'Marble' :
  [0.010, 0.010, 0.010, 0.010, 0.010, 0.010, 0.020, 0.020, 0.0400],
  'Metal' :
  [0.030, 0.035, 0.040, 0.040, 0.050, 0.050, 0.050, 0.070, 0.090],
  'ParquetOnConcrete' :
  [0.028, 0.030, 0.040, 0.040, 0.070, 0.060, 0.060, 0.070, 0.140],
  'PlasterRough' :
  [0.017, 0.018, 0.020, 0.030, 0.040, 0.050, 0.040, 0.030, 0.060],
  'PlasterSmooth' :
  [0.011, 0.012, 0.013, 0.015, 0.020, 0.030, 0.040, 0.050, 0.100],
  'PlywoodPanel' :
  [0.400, 0.340, 0.280, 0.220, 0.170, 0.090, 0.100, 0.110, 0.220],
  'PolishedConcreteOrTile' :
  [0.008, 0.008, 0.010, 0.010, 0.015, 0.020, 0.020, 0.020, 0.040],
  'Sheetrock' :
  [0.290, 0.279, 0.290, 0.100, 0.050, 0.040, 0.070, 0.090, 0.180],
  'WaterOrIceSurface' :
  [0.006, 0.006, 0.008, 0.008, 0.013, 0.015, 0.020, 0.025, 0.050],
  'WoodCeiling' :
  [0.150, 0.147, 0.150, 0.110, 0.100, 0.070, 0.060, 0.070, 0.140],
  'WoodPanel' :
  [0.280, 0.280, 0.280, 0.220, 0.170, 0.090, 0.100, 0.110, 0.220],
  'Uniform' :
  [0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500]
}

Room.getCoefficientsFromMaterials = function(materials) {
  // Initialize coefficients to use default coefficients.
  var coefficients = {};
  for (var i = 0; i < Room.NumWalls; i++) {
    var key = Room.WallTypes[i];
    var defaultMaterialForWall = Room.DefaultMaterials[key];
    coefficients[key] = Room.MaterialCoefficients[defaultMaterialForWall];
  }

  // Sanitize materials.
  if (materials == undefined) {
    materials = Room.DefaultMaterials;
  }

  // Default to using 'Walls' for all walls if present (not ceiling/floor).
  if ('walls' in materials) {
    for (var i = 0; i < Room.NumWalls; i++) {
      var key = Room.WallTypes[i];
      if (key !== 'ceiling' && key !== 'floor') {
        materials[key] = materials['walls'];
      }
    }
  }

  // Assign coefficients using provided materials.
  for (var i = 0; i < Room.NumWalls; i++) {
    var key = Room.WallTypes[i];
    if (key in materials) {
      var defaultMaterialForWall = Room.DefaultMaterials[key];
      if (materials[key] in Room.MaterialCoefficients) {
        coefficients[key] = Room.MaterialCoefficients[materials[key]];
      } else {
        Utils.log('Material \"' + materials[key] + '\" on Wall \"' + key +
          '\" not found. Using \"' + defaultMaterialForWall + '\".');
      }
    } else {
      Utils.log('Wall \"' + key + '\" is not defined and will be ignored.');
    }
  }
  return coefficients;
}

Room.sanitizeCoefficients = function(coefficients) {
  if (coefficients == undefined) {
    coefficients = {};
  }
  for (var i = 0; i < Room.NumWalls; i++) {
    var key = Room.WallTypes[i];
    if (!(key in coefficients)) {
      // If element is not present, use default coefficients.
      var defaultMaterialForWall = Room.DefaultMaterials[key];
      coefficients[key] = Room.MaterialCoefficients[defaultMaterialForWall];
    }
  }
  return coefficients;
}

Room.sanitizeDimensions = function(dimensions) {
  if (dimensions == undefined) {
    dimensions = {};
  }
  for (var i = 0; i < Room.NumDimensions; i++) {
    var key = Room.DimensionTypes[i];
    if (!(key in dimensions)) {
      dimensions[key] = Room.DefaultDimensions[key];
    }
  }
  return dimensions;
}

Room.computeReflectionCoefficients = function(coefficients) {
  var reflectionCoefficients = {'left' : 0, 'right' : 0, 'front' : 0,
    'back' : 0, 'floor' : 0, 'ceiling' : 0};

  // Sanitize inputs.
  coefficients = Room.sanitizeCoefficients(coefficients);

  // Compute average reflection coefficient per wall.
  for (var i = 0; i < Room.NumWalls; i++) {
    var key = Room.WallTypes[i];
    for (var j = 0; j < Globals.DefaultReflectionsNumAveragingBands; j++) {
      var bandIndex = j + Globals.DefaultReflectionsStartingBand;
      reflectionCoefficients[key] += coefficients[key][bandIndex];
    }
    reflectionCoefficients[key] /= Globals.DefaultReflectionsNumAveragingBands;
    reflectionCoefficients[key] = Math.sqrt(1 - reflectionCoefficients[key]);
  }
  return reflectionCoefficients;
}

Room.computeRT60Secs = function(dimensions, coefficients, speedOfSound) {
  var RT60Secs = new Float32Array(Globals.NumReverbBands);

  // Sanitize inputs.
  dimensions = Room.sanitizeDimensions(dimensions);
  coefficients = Room.sanitizeCoefficients(coefficients);
  if (speedOfSound == undefined) {
    speedOfSound = Globals.DefaultSpeedOfSound;
  }

  // Acoustic constant.
  var k = Globals.TwentyFourLog10 / speedOfSound;

  // Compute volume, skip if room is not present.
  var volume = dimensions['width'] * dimensions['height'] * dimensions['depth'];
  if (volume < Room.MinVolume) {
    return RT60Secs;
  }

  // Room surface area.
  var leftRightArea = dimensions['width'] * dimensions['height'];
  var floorCeilingArea = dimensions['width'] * dimensions['depth'];
  var frontBackArea = dimensions['depth'] * dimensions['height'];
  var totalArea = 2 * (leftRightArea + floorCeilingArea + frontBackArea);
  for (var i = 0; i < Globals.NumReverbBands; i++) {
    // Effective absorptive area.
    var absorbtionArea =
      (coefficients['left'][i] + coefficients['right'][i]) *
      leftRightArea +
      (coefficients['floor'][i] + coefficients['ceiling'][i]) *
      floorCeilingArea +
      (coefficients['front'][i] + coefficients['back'][i]) *
      frontBackArea;
    var meanAbsorbtionArea = absorbtionArea / totalArea;

    // Compute reverberation using one of two algorithms, depending on area.
    //TODO(bitllama): Point to references for these equations.
    if (meanAbsorbtionArea <= 0.5) {
      // Sabine equation.
      RT60Secs[i] = k * volume / (absorbtionArea + 4 *
        Room.AirAbsorbtionCoefficients[i] * volume);
    } else {
      // Eyring equation.
      RT60Secs[i] = k * volume / (-totalArea * Math.log(1 -
        meanAbsorbtionArea) + 4 * Room.AirAbsorbtionCoefficients[i] * volume);
    }
  }
  return RT60Secs;
}

module.exports = Room;