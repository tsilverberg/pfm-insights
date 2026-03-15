import React from 'react';
import ProgressBar from './ProgressBar';
import './WellnessJourney.css';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'locked';
  progress: number;
  description: string;
}

interface Mission {
  name: string;
  progress: number;
  total: number;
  xp: number;
}

interface WellnessJourneyProps {
  stages: Stage[];
  missions?: Mission[];
}

const STATUS_ICONS: Record<string, string> = {
  completed: 'check_circle',
  active: 'play_arrow',
  locked: 'lock',
};

const WellnessJourney: React.FC<WellnessJourneyProps> = ({ stages, missions }) => {
  return (
    <div className="wellness-journey" role="list" aria-label="Wellness journey stages">
      <div className="wellness-journey__timeline" aria-hidden="true" />
      {stages.map((stage) => {
        const isActive = stage.status === 'active';
        const isLocked = stage.status === 'locked';
        return (
          <div key={stage.id} className="wellness-journey__stage" role="listitem">
            <div
              className={`wellness-journey__status wellness-journey__status--${stage.status}`}
              aria-label={stage.status}
            >
              <span className="material-symbols-rounded" aria-hidden="true">
                {STATUS_ICONS[stage.status]}
              </span>
            </div>
            <div className="wellness-journey__stage-body">
              <span
                className={`wellness-journey__stage-name ${isLocked ? 'wellness-journey__stage-name--locked' : ''}`}
              >
                {stage.name}
              </span>
              <span
                className={`wellness-journey__stage-desc ${isLocked ? 'wellness-journey__stage-desc--locked' : ''}`}
              >
                {stage.description}
              </span>
              {!isLocked && (
                <div className="wellness-journey__stage-progress">
                  <ProgressBar
                    value={stage.progress}
                    max={100}
                    color={
                      stage.status === 'completed'
                        ? 'var(--pfm-status-success)'
                        : 'var(--pfm-action-primary-bg)'
                    }
                    height={4}
                  />
                </div>
              )}
              {isActive && missions && missions.length > 0 && (
                <div className="wellness-journey__missions">
                  {missions.slice(0, 2).map((mission) => (
                    <div key={mission.name} className="wellness-journey__mission">
                      <div className="wellness-journey__mission-header">
                        <span className="wellness-journey__mission-name">{mission.name}</span>
                        <span className="wellness-journey__mission-xp">{mission.xp} XP</span>
                      </div>
                      <ProgressBar
                        value={mission.progress}
                        max={mission.total}
                        color="var(--pfm-action-primary-bg)"
                        height={4}
                      />
                      <span className="wellness-journey__mission-progress-label">
                        {mission.progress}/{mission.total}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WellnessJourney;
