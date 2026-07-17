---
title: Scenarios & Walkthroughs
weight: 70
description: "End-to-end Podstack QuickPods walkthroughs — run a Jupyter notebook on an A100, deploy ComfyUI from a 1-click template, and track an experiment and register a model."
keywords:
  - Jupyter A100
  - deploy ComfyUI
  - GPU notebook walkthrough
  - QuickPods tutorial
  - experiment tracking walkthrough
  - register model
  - ComfyUI template
  - end to end GPU
  - vLLM serving
  - GPU pod example
---
# Scenarios & Walkthroughs

Three end-to-end examples that tie the QuickPods flow together. Each assumes you're verified, have a project, and have funded your wallet — see [Launch a Pod](/docs/quickpod/launch-a-pod/#before-you-start).

## Scenario 1 — Run a Jupyter notebook on an A100

Goal: an interactive GPU notebook for experimentation, with your work saved to a volume.

1. **Create a volume first (optional but recommended).** Go to **NFS Volumes → Create Volume**, name it `notebooks`, set **Quota (GB)** to 100, pick a **Billing Period**, and click **Create Volume**. See [Storage & Data](/docs/quickpod/storage-and-data/).
2. **Launch the pod.** Go to **Pods → Launch Pod**.
3. On **Instance Type**, search `A100`, confirm it shows availability, and click **Select**.
4. On **Choose a Template**, pick the **pytorch** template (PyTorch + Jupyter) — or **jupyterlab-gpu** for a bare JupyterLab.
5. On **Configure**:
   - Set a **Pod Name** (e.g. `a100-jupyter`) and choose your **Project**.
   - Leave the GPU at 1 × 100%, or drop **GPU Memory/Cores per GPU** to a fraction if you don't need the whole card.
   - In **NFS Volume**, select `notebooks` and keep the mount path `/data`.
   - Under **SSH Key Access**, pick a key if you want SSH too.
   - Confirm port `8888` is in **Exposed Ports**.
6. Review the **Summary** and click **Launch Pod**.
7. When the pod is **running**, open it and use the **Notebook Access** card: open the **Notebook URL**, log in with username `podstack` and the shown **Password** (copy it — it's shown once).
8. Save your notebooks and data under `/data` so they persist. Stop the pod when you're done to pause billing.

> On JupyterHub-based images, log in with any username and your Podstack API token (`psk_...`) as the password — generate one at **Account > API Tokens**.

## Scenario 2 — Deploy ComfyUI from a template

Goal: a running ComfyUI instance for node-graph image/video generation, with models and workflows that survive restarts.

1. **Create a volume** named `comfyui` (say 250 GB) from **NFS Volumes → Create Volume** — ComfyUI models are large.
2. Go to **Pods → Launch Pod**.
3. On **Instance Type**, choose a GPU with enough VRAM for your models (e.g. an L40S or A100) and click **Select**.
4. On **Choose a Template**, search `comfyui` and select the **comfyui** template. Its image, port (8188), and startup are pre-configured.
5. On **Configure**:
   - Set a **Pod Name** and **Project**.
   - In **NFS Volume**, select `comfyui`. **Keep the mount path `/data`** — ComfyUI stores custom nodes, models, and workflows under `/data`, and changing it means losing that setup on every restart.
   - Confirm the ComfyUI port (`8188`) is under **Exposed Ports**.
6. Click **Launch Pod**.
7. When it's **running**, open the pod, find the ComfyUI port under **Exposed Ports & Endpoints**, and open its `https://<subdomain>-8188.cloud.podstack.ai` URL.
8. Add models and custom nodes into `/data` (over SSH/SCP or from object storage). They'll still be there after a stop/start. See the [ComfyUI image reference](/docs/container-images/comfyui/).

<!-- screenshot: a running ComfyUI pod's exposed-port endpoint opening the ComfyUI UI -->

## Scenario 3 — Track an experiment and register a model

Goal: run training on a pod, log metrics to experiment tracking, then register the resulting model. See [MLOps](/docs/quickpod/mlops/) for full detail on each step.

1. **Launch a training pod.** Use the **pytorch** template on a suitable GPU, attach a volume at `/data` for your dataset and checkpoints, and add an SSH key so you can push code. See [Launch a Pod](/docs/quickpod/launch-a-pod/).
2. **Get an API key.** At **Account > API Tokens**, create a token (`psk_...`).
3. **Instrument your training script** with the Podstack registry SDK:

   ```python
   from podstack import registry
   import torch

   registry.init(api_key="psk_...", project_id="your-project")
   registry.set_experiment("sentiment-fine-tuning")

   with registry.start_run(name="run-1") as run:
       registry.log_params({"learning_rate": 0.001, "batch_size": 32, "epochs": 10})

       for epoch in range(10):
           train_loss = train_one_epoch()
           val_loss, val_acc = validate()
           registry.log_metrics(
               {"train_loss": train_loss, "val_loss": val_loss, "val_accuracy": val_acc},
               step=epoch,
           )

       torch.save(model.state_dict(), "model.pt")
       registry.log_artifact("model.pt")
       run_id = run.id

   # Register the trained model, preserving lineage back to this run
   registry.register_model(
       name="sentiment-classifier",
       run_id=run_id,
       description="BERT fine-tuned on the v2 dataset",
   )
   ```

4. **Run it** on the pod (over SSH or the Web Terminal): `python train.py`.
5. **Review in the portal.** Open **Experiment Tracking → sentiment-fine-tuning**, watch the run's metrics stream in, and compare runs with the **Chart** and **Params** views.
6. **Promote the model.** In the **Model Registry**, expand `sentiment-classifier`, then move the version through **staging → production** (or request approval if your team gates promotions). Optionally set an alias:

   ```python
   registry.set_model_stage("sentiment-classifier", version=1, stage="staging", comment="passed eval")
   registry.set_model_alias("sentiment-classifier", alias="champion", version=1)
   ```

7. **Automate it.** Create a **Training Schedule** for `sentiment-fine-tuning` (e.g. weekly, `0 2 * * 1`) so the model retrains on a cadence, and add a **Drift Monitor** to trigger retraining when input drift is detected. See [MLOps](/docs/quickpod/mlops/).
