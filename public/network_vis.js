import "plugins/network_vis/network_vis.less";
import 'plugins/network_vis/network_vis_controller';

import 'ui/agg_table';
import 'ui/agg_table/agg_table_group';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { Schemas } from 'ui/vis/editors/default/schemas';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import image from './images/icon-network.svg';
import networkVisTemplate from 'plugins/network_vis/network_vis.html';
import networkVisParamsTemplate from 'plugins/network_vis/network_vis_params.html';




// register the provider with the visTypes registry
VisTypesRegistryProvider.register(NetworkVisTypeProvider);

// define the TableVisType
function NetworkVisTypeProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);

  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return VisFactory.createAngularVisualization({
    name: 'network',
    title: 'Network',
    image,
    description: 'Displays a network node that link two fields that have been selected.',
    category: CATEGORY.OTHER,

    visConfig: {
      defaults: {
        showLabels: true,
        showPopup: false,
        showColorLegend: true,
        nodePhysics: true,
        firstNodeColor: '#FFFF00',
        secondNodeColor: '#FF0000',
        shapeFirstNode: 'dot',
        shapeSecondNode: 'triangle',
        displayArrow: true,
        posArrow: 'to',
        shapeArrow: 'arrow',
        smoothType: 'continuous',
        scaleArrow: 1,
        maxCutMetricSizeNode: 5000,
        maxCutMetricSizeEdge: 5000,
        minCutMetricSizeNode: 0,
        maxNodeSize: 25,
        minNodeSize: 10,
        maxEdgeSize: 10,
        minEdgeSize: 2,
        scalingXPosition: 0.6,
        scalingYPosition: 0.6,
        legendTitleSize: 14,
        legendContentSize: 12,
        legendWidth: 150,
        legendPadding: 10,
        springConstant: 0.01,
        gravitationalConstant: -1000,
        labelColor: '#000000'
      },
      template: networkVisTemplate,
    },
    editorConfig: {
      optionsTemplate: networkVisParamsTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'size_node',
          title: 'Node Size',
          mustBeFirst: 'true',

          max: 1,
          defaults: [
            { type: 'count', schema: 'size_node' }
          ]

          //aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
        },
        {
          group: 'metrics',
          name: 'size_edge',
          title: 'Edge Size',
          max: 1,
        },
        {
          group: 'buckets',
          name: 'first',
          icon: 'fa fa-circle-thin',
          mustBeFirst: 'true',
          title: 'Node',
          min: 1,
          max: 2,
          aggFilter: ['terms']//Only have sense choose terms
        },
        {
          group: 'buckets',
          name: 'second',
          icon: 'fa fa-random',
          title: 'Relation',
          max: 1,
          aggFilter: ['terms']
        },
        {
          group: 'buckets',
          name: 'colornode',
          icon: 'fa fa-paint-brush',
          title: 'Node Color',
          max: 1,
          aggFilter: ['terms']
        }
      ])
    },
    responseHandlerConfig: {
      asAggConfigResults: true
    },
    ////////MIRAR THIS
    hierarchicalData: function (vis) {
      return true;
    },
    ////////////////////


  });
}

export default NetworkVisTypeProvider;
