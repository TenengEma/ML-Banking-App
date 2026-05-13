def score_contextual(context: dict) -> float:
  score = 0.0
  if context.get('new_ip'): score += 0.3
  if context.get('unusual_time'): score += 0.2
  return min(score, 1.0)


def score_behavioral(behavior: dict) -> float:
  cadence_var = behavior.get('typing_variance', 0.0)
  mouse_anomaly = behavior.get('mouse_anomaly', 0.0)
  return min((cadence_var * 0.5) + (mouse_anomaly * 0.5), 1.0)


def score_transactional(tx: dict) -> float:
  amount = float(tx.get('amount', 0))
  daily_avg = float(tx.get('daily_avg', 1))
  ratio = amount / max(daily_avg, 1)
  if ratio > 10: return 1.0
  if ratio > 5: return 0.8
  if ratio > 2: return 0.4
  return 0.1


def aggregate_risk(context: dict, behavior: dict, tx: dict) -> dict:
  contextual = score_contextual(context)
  behavioral = score_behavioral(behavior)
  transactional = score_transactional(tx)
  total = round((contextual * 0.3) + (behavioral * 0.3) + (transactional * 0.4), 3)
  return {
    'contextual': contextual,
    'behavioral': behavioral,
    'transactional': transactional,
    'risk_score': total,
    'requires_manual_review': total >= 0.65,
  }
