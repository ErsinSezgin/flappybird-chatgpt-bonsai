# 12 — collision detection

**Status:** ✅ Done
**Description:** Implement AABB-based collision detection between the bird and game obstacles (ground, ceiling, and pipes). The system checks if the bird's bounding box overlaps with any obstacle during each game frame.

## Scope
- Implement `checkAllCollisions()` that returns true if the bird collides with any obstacle:
  - **Ground collision**: Bird's bottom edge touches or crosses the ground line
  - **Ceiling collision**: Bird's top edge touches or crosses y=0 (canvas boundary)
  - **Pipe collision**: Bird's bounding box overlaps with any pipe's top or bottom segment

- Implement `checkPipeCollision()` for per-pipe AABB overlap detection:
  - Check horizontal overlap between bird and pipe
  - If horizontally overlapping, check if the bird is outside the gap (in top or bottom pipe body)

- Implement AABB primitives:
  - `createBirdBox()` — builds a collision box from bird center position and size
  - `AABBoverlap()` — checks if two axis-aligned bounding boxes intersect

- Ensure the collision system is tested by existing unit tests in `src/game/collision/__tests__/`

## Dependencies
- Task 7 — Player physics (provides `player.y`, `player.vy` velocities)
- Task 9 — Pipe model (provides pipe positions, widths, and gap heights)
- Task 10 — Gap generation (provides properly placed pipe arrays)

## Acceptance criteria
- [ ] `checkAllCollisions()` correctly returns true for ground, ceiling, and pipe collisions
- [ ] `checkAllCollisions()` correctly returns false when the bird is in safe space (gap, between pipes, above ground)
- [ ] AABB overlap logic handles edge cases: bird exactly touching obstacle boundaries
- [ ] Tests in `src/game/collision/__tests__/` all pass

## Notes
- The collision system uses AABB (Axis-Aligned Bounding Box) for simplicity and performance.
- Bird is treated as a square box centered on `(player.x, player.y)` with size derived from `player.height` or `player.radius`.
- Pipe collision checks treat pipes as two rectangles: top pipe (from canvas top to gap) and bottom pipe (from gap+gapHeight to ground).
- Ground collision uses `>=` for the bottom edge (bird hits from above).
