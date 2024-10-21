import { DatePipe, NgFor, NgIf } from '@angular/common'
import { Component, Input, OnChanges } from '@angular/core'
import { RouterLink } from '@angular/router'
import { HooksService } from '@app/core'
import { VideoDetails } from '@app/shared/shared-main/video/video-details.model'
import { GlobalIconComponent } from '../../../../shared/shared-icons/global-icon.component'
import { TimeDurationFormatterPipe } from '../../../../shared/shared-main/angular/time-duration-formatter.pipe'

type PluginMetadata = {
  label: string

  value?: string
  safeHTML?: string
}

@Component({
  selector: 'my-video-attributes',
  templateUrl: './video-attributes.component.html',
  styleUrls: [ './video-attributes.component.scss' ],
  standalone: true,
  imports: [ NgIf, RouterLink, GlobalIconComponent, NgFor, DatePipe, TimeDurationFormatterPipe ]
})
export class VideoAttributesComponent implements OnChanges {
  @Input() video: VideoDetails

  pluginMetadata: PluginMetadata[] = []

  constructor (private hooks: HooksService) { }

  async ngOnChanges () {
    this.pluginMetadata = await this.hooks.wrapObject(
      this.pluginMetadata,
      'video-watch',
      'filter:video-watch.video-plugin-metadata.result',
      { video: this.video }
    )
  }

  getVideoHost () {
    return this.video.channel.host
  }

  getVideoTags () {
    if (!this.video || Array.isArray(this.video.tags) === false) return []

    return this.video.tags
  }
}
