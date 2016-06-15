import '../../../Content/bootstrap.css';
import '../../../Content/Site.css';
import { configure } from '@kadira/storybook';

function loadStories() {
  require('../movie-management/components/stories/');
}

configure(loadStories, module);